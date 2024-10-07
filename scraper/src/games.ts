import { producer, sleep, token } from ".";

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

  let games = parsedResult.data;

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

export async function getGamesAndSendToKafka() {
  let games = await fetchTopGames(undefined, 0);
  await producer.send({
    topic: "twitch-games",
    messages: [
      {
        value: JSON.stringify(games),
      },
    ],
  });
  console.log("Games sent to Kafka");

  return games.map((game: any) => game.id);
}
