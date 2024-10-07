import { producer, sleep, token } from ".";

export async function fetchStreamBatch(
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

export async function getStreamBatchAndSendToKafka(
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

export async function lookupStreams(games: string[]) {
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
