// Imports
import { Kafka } from "kafkajs";

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
const producer = kafka.producer();

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

let token = "";

async function fetchTopGames(
  pagination: undefined | string,
  recursionDepth: number
) {
  let path = "https://api.twitch.tv/helix/games/top?first=100";
  if (pagination !== undefined) {
    path += "&after=" + pagination;
  }

  let result: Response;

  try {
    result = await fetch(path, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Client-Id": "hjkqp89ai189tpqz80ysz2lg1mymy3",
      },
    });

    if (!result.ok) {
      throw result.statusText;
    }
  } catch (error) {
    console.warn("Error while fetching top games: ", error);
    await sleep(2000);
    return fetchTopGames(pagination, recursionDepth + 1);
  }

  const parsedResult = await result.json();

  let games = parsedResult.data.map((game: any) => game.id);

  console.log(
    `Fetched ${games.length} games - recursion depth: ${recursionDepth}`
  );

  if (parsedResult.pagination.cursor !== undefined) {
    const nextGames = await fetchTopGames(
      parsedResult.pagination.cursor,
      recursionDepth + 1
    );
    nextGames.forEach((game: string) => {
      if (!games.includes(game)) {
        games.push(game);
      }
    });
  }

  return games;
}

async function fetchStreamBatch(
  pagination: string | undefined,
  gameIds: string | string[],
  batchIndex: number,
  recursionDepth: number
) {
  let gamesUrlParam = "";

  if (typeof gameIds === "string") {
    gamesUrlParam = `&game_id=${gameIds}`;
  } else {
    gamesUrlParam = gameIds.map((id) => `&game_id=${id}`).join("");
  }

  let paginationUrlParam = "";
  if (pagination !== undefined) {
    paginationUrlParam = `&after=${pagination}`;
  }

  let path = `https://api.twitch.tv/helix/streams?first=100&type=live${gamesUrlParam}${paginationUrlParam}`;

  let result: Response;

  try {
    result = await fetch(path, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Client-Id": "hjkqp89ai189tpqz80ysz2lg1mymy3",
      },
    });

    if (!result.ok) {
      throw result.statusText;
    }
  } catch (error) {
    console.warn(
      `Error while fetching streams batch ${batchIndex} - recursion depth: ${recursionDepth} :`,
      error
    );
    await sleep(2000);
    return fetchStreamBatch(
      pagination,
      gameIds,
      batchIndex,
      recursionDepth + 1
    );
  }

  const parsedResult = await result.json();
  let streams = parsedResult.data;

  //   console.log(
  //     `Fetched streams batch ${batchIndex} - recursion depth: ${recursionDepth} - stream number: ${streams.length}`
  //   );

  if (parsedResult.pagination.cursor !== undefined) {
    const nextStreams = await fetchStreamBatch(
      parsedResult.pagination.cursor,
      gameIds,
      batchIndex,
      recursionDepth + 1
    );
    streams = streams.concat(nextStreams);
  }

  return streams;
}

async function getStreamBatchAndSendToKafka(
  gameIds: string | string[],
  timestamp: number,
  batchIndex: number,
  batchNumber: number
) {
  const streams = await fetchStreamBatch(undefined, gameIds, batchIndex, 0);
  console.log(`Batch ${batchIndex} fetched, stream number: ${streams.length}`);

  let message = `${timestamp};${batchIndex};${batchNumber}\n`;

  const messages = streams.map((stream: any) => {
    return `${stream.id};${stream.user_id};${stream.game_id};${stream.language};${stream.viewer_count}`;
  });

  message += messages.join("\n");

  await producer.send({
    topic: "twitch-streams",
    messages: [{ value: message }],
  });
}

async function lookupStreams(games: string[]) {
  console.log("Looking up streams with " + games.length + " games");
  const timestamp = Date.now();

  games.sort(() => Math.random() - 0.5);

  const desiredGroupNumber = 10;
  const groupSize = Math.min(Math.ceil(games.length / desiredGroupNumber), 100);
  const groups: string[][] = [];

  for (let i = 0; i < games.length; i += groupSize) {
    groups.push(games.slice(i, i + groupSize));
  }

  console.log("Group size: " + groupSize);
  console.log("Batch number: " + groups.length);

  const promises: Promise<void>[] = [];

  for (let i = 0; i < groups.length; i++) {
    promises.push(
      getStreamBatchAndSendToKafka(groups[i], timestamp, i, groups.length)
    );
    await sleep(1000 / groups.length);
  }

  await Promise.all(promises);

  console.log("Finished streams lookup in " + (Date.now() - timestamp));
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  try {
    while (true) {
      console.log("new run : " + new Date().toLocaleTimeString());
      token = await getToken();
      console.log("Token fetched: ", token);
      const games = await fetchTopGames(undefined, 0);
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
