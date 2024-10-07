import { Kafka, EachMessagePayload } from "kafkajs";
import { sendMessageToClients } from "./websocket";
import { getDb } from "./mongodb";

const defaultBrokers = [
  "localhost:29092",
  "localhost:39092",
  "localhost:49092",
];
const brokers = process.env.KAFKA_BROKERS
  ? process.env.KAFKA_BROKERS.split(",")
  : defaultBrokers;

const kafka = new Kafka({
  clientId: "my-app",
  brokers,
});

const consumer = kafka.consumer({
  groupId: "group-id",
  allowAutoTopicCreation: true,
});

// Fonction pour démarrer le consumer Kafka
export const runKafkaConsumer = async (
  dataCache: string[],
  gameCache: Map<string, any>
) => {
  try {
    await consumer.connect();

    do {
      try {
        await consumer.subscribe({
          topic: "processed-twitch-data",
          fromBeginning: true,
        });
        await consumer.subscribe({
          topic: "twitch-games",
          fromBeginning: true,
        });
        break;
      } catch (error) {
        console.error("Erreur lors de la souscription au topic :", error);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } while (true);

    await consumer.run({
      eachMessage: async ({
        topic,
        partition,
        message,
      }: EachMessagePayload) => {
        switch (topic) {
          case "processed-twitch-data":
            const msg = message.value?.toString() || "";
            const parsedMessage = JSON.parse(msg);
            console.log(`Data reçu: ${msg}`);

            dataCache.push(parsedMessage);

            // Envoyer le message au client WebSocket
            sendMessageToClients("data", parsedMessage);
            break;
          case "twitch-games":
            const games = JSON.parse(message.value?.toString() ?? "");
            console.log(`Jeux reçus: ${games.length}`);

            games.forEach((game: any) => {
              gameCache.set(game.id, game);
            });

            sendMessageToClients(
              "games",
              Array.from(gameCache.values())
            );

            break;
        }
      },
    });

    console.log("Consumer Kafka démarré");
  } catch (error) {
    console.error("Erreur lors du démarrage du consumer Kafka :", error);
  }
};
