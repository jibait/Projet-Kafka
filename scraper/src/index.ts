// Imports
import { Kafka } from "kafkajs";
import { getGamesAndSendToKafka } from "./games";
import { lookupStreams } from "./streams";

const defaultBrokers = [
  "localhost:29092",
  "localhost:39092",
  "localhost:49092",
];
const brokers = process.env.KAFKA_BROKERS
  ? process.env.KAFKA_BROKERS.split(",")
  : defaultBrokers;

const defaultRequestInterval = 1000 * 10; // 5 minutes
const requestInterval = process.env.REQUEST_INTERVAL_SECONDS
  ? parseInt(process.env.REQUEST_INTERVAL_SECONDS) * 1000
  : defaultRequestInterval;

console.log("Starting data scrapper service");
console.log("Brokers: ", brokers);
console.log(`Request interval: ${requestInterval}ms`);

const kafka = new Kafka({
  ssl: false, // optional, defaults to false
  // Define the brokers (or list of brokers)
  clientId: "twitch-scrapper",
  brokers,
});

export const producer = kafka.producer();

async function getToken() {
  const result = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: "hjkqp89ai189tpqz80ysz2lg1mymy3",
      client_secret: "an9465f7mfb6rolqu53vxdigtlcm4r",
      grant_type: "client_credentials",
    }),
  });

  return (await result.json()).access_token;
}

export let token = "";

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  try {
    while (true) {
      console.log("new run : " + new Date().toLocaleTimeString());
      token = await getToken();
      console.log("Token fetched: ", token);
      const games = await getGamesAndSendToKafka();
      console.log("Fetched " + games.length + " games");
      await lookupStreams(games);
      console.log(
        "Finished streams lookup, sleeping for " + requestInterval + "ms"
      );
      await sleep(requestInterval);
    }
  } catch (error) {
    console.error("Error in run function:", error);
  }
}

async function connectProd() {
  console.log("Producer connected");
  await producer.connect();
}

connectProd();
run();

