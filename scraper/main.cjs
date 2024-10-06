// Imports
const https = require("https");
const { Kafka } = require('kafkajs');
const fs = require('fs');
const process = require('node:process');

const defaultBrokers = ["localhost:29092", "localhost:39092", "localhost:49092"];
const brokers = process.env.KAFKA_BROKERS ? process.env.KAFKA_BROKERS.split(",") : defaultBrokers;

const defaultRequestInterval = 1000 * 60 * 5; // 5 minutes
const requestInterval = process.env.REQUEST_INTERVAL_SECONDS ? parseInt(process.env.REQUEST_INTERVAL_SECONDS) * 1000 : defaultRequestInterval;

console.log("Starting data scrapper service");
console.log("Brokers: ", brokers);
console.log(`Request interval: ${requestInterval}ms`);

const kafka = new Kafka({
	ssl: false, // optional, defaults to false
	// Define the brokers (or list of brokers)
	clientId: 'Scapper Twitch',
	brokers,
	socketTimeout: 30000, // Set a longer socket timeout (30 seconds)
	maxInFlightRequests: 1000, // Increase the number of in-flight requests
});
const producer = kafka.producer();

function get_token() {
	return new Promise((resolve, reject) => {
		let response_token = "";
		const body = JSON.stringify({
			client_id: "hjkqp89ai189tpqz80ysz2lg1mymy3",
			client_secret: "an9465f7mfb6rolqu53vxdigtlcm4r",
			grant_type: "client_credentials",
		});
		const options = {
			hostname: "id.twitch.tv",
			path: "/oauth2/token",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Content-Length": body.length,
			},
		};

		https.request(options, (res) => {
			let data = "";
			res.on("data", (chunk) => {
				data += chunk;
			});
			res.on("end", () => {
				response_token = JSON.parse(data).access_token;
				resolve(response_token);
			});
		}).write(body);
	});
}

var token = "";
var dictionary = {};
var mem = [];
var games = [];
var last = null;
function getTopGames(pagination, refresh = false) {
	var toppath = "/helix/games/top?first=100";
	if (pagination !== null) {
		toppath += "&after=" + pagination;
	}
	const getOptions = {
		hostname: "api.twitch.tv",
		path: toppath,
		method: "GET",
		headers: {
			Authorization: "Bearer " + token,
			"Client-Id": "hjkqp89ai189tpqz80ysz2lg1mymy3",
		},
	};
	const timestamp = Date.now();
	Promise.all([
		https
			.get(getOptions, (res) => {
				let data = "";

				res.on("data", (chunk) => {
					data += chunk;
				});

				res.on("end", () => {
					var response = JSON.parse(data).data;
					if (response == undefined && !refresh) {
						lookupStreams(timestamp);	
					} else {
						response.forEach((game) => {
							if (games.indexOf(game.id) === -1) {
								games.push(game.id);
							}
						});
						var pagination = JSON.parse(data).pagination.cursor;
						getTopGames(pagination)
					}

				});
			})
	])
}
async function getStreams(pagination, gameid, timestamp) {
	let batch = false;
	if (typeof(gameid) === "string") {
		gameid = "&game_id=" + gameid;
		batch = false;
	} else {
		try {
			gameid = gameid.join("&game_id=");
			gameid = "&game_id=" + gameid;
			batch = true;
		} catch (error) {
			console.log("Not an array");
			console.log(typeof(gameid));
			console.log(gameid);
			console.log(error);
		}
	}
	// console.log(gameid);
	var path = "/helix/streams?first=100&type=live" + gameid;
	if (pagination !== null) {
		path += "&after=" + pagination;
	}
	const getOptions = {
		hostname: "api.twitch.tv",
		path: path,
		method: "GET",
		headers: {
			Authorization: "Bearer " + token,
			"Client-Id": "hjkqp89ai189tpqz80ysz2lg1mymy3",
		},
	};
	Promise.all([
		https
			.get(getOptions, (res) => {
				let data = "";

				res.on("data", (chunk) => {
					data += chunk;
				});

				res.on("end", () => {
					let named = true;
					let message = "";
					last = res.headers["ratelimit-remaining"];
					var streams = JSON.parse(data).data;
					if (streams != undefined) {
						const groupedStreams = streams.reduce((acc, stream) => {
							if (!acc[stream.game_id]) {
								acc[stream.game_id] = [];
							}
							acc[stream.game_id].push(stream);
							return acc;
						}, {});

						for (const gameId in groupedStreams) {
							const gameStreams = groupedStreams[gameId];
							let GameName = "";
							message = `${timestamp};${games.indexOf(gameId)};${games.length}\n`;
							gameStreams.forEach((stream) => {
								GameName = stream.game_name;
								message += `${stream.id};${stream.user_id};${stream.game_id};${stream.language};${stream.viewer_count}\n`;
							});
							producer.send({
								topic: "twitch-streams",
								messages: [{
									key: `${GameName}`,
									value: `${message}`
								}]
							}, (err, result) => {
								if (!err) console.log("Message produced successfully");
								if (err) console.log(err);
							});
						}
						if (JSON.parse(data).pagination.cursor !== null) {
							pagination = JSON.parse(data).pagination.cursor;
							getStreams(pagination, gameid.split("&game_id="), timestamp);
						} 
						return;
					} else if (JSON.parse(data).status === 429) {
						const logStream = fs.createWriteStream('stream_logs.txt', { flags: 'a' });
						logStream.write(`Rate limit exceeded\n`);
						console.log("Rate limit exceeded");
						setTimeout(() => {
							getStreams(pagination ? pagination:null, gameid.split("&game_id="), timestamp);
						}, 1000 * 1);
					}
			});
		})
	])
}

function lookupStreams(timestamp) {
	console.log("Lookup streams on " + games.length + " games");
	const logStream = fs.createWriteStream('stream_logs.txt', { flags: 'a' });
	logStream.write(`Lookup streams on ${games.length} games at ${new Date().toLocaleString()}\n`);
	games.slice(0, 50).forEach((game) => {
		getStreams(null, game, timestamp);
	});
	let group = [];
	games.slice(50).forEach((game, index) => {
		if (index % 22 !== 0) {
			group.push(game);
		} else {
			if (group.length !== 0) {
				getStreams(null, group, timestamp);
				group = [];
			}	
		}
	});
}

async function run () {
	try {
		token = await get_token();
		getTopGames(null);
	} catch (error) {
		console.error("Error in run function:", error);
	}
}

async function connectProd() {
	console.log('Producer connected');
	await producer.connect();
}

connectProd()
console.log("new run : " + new Date().toLocaleTimeString());
run().catch(console.error);
setInterval(() => {
	console.log("new run : " + new Date().toLocaleTimeString());
	run().catch(console.error);
}, requestInterval);
