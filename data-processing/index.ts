import { Kafka } from "kafkajs";
import { EventHandler } from "./eventHandler";
import { parseScrapperEvent } from "./event";

const defaultBrokers = [
  "localhost:29092",
  "localhost:39092",
  "localhost:49092",
];
const brokers = process.env.KAFKA_BROKERS
  ? process.env.KAFKA_BROKERS.split(",")
  : defaultBrokers;

console.log("Starting data processing service with brokers: ", brokers);

const kafka = new Kafka({
  clientId: "data-processing",
  brokers,
  connectionTimeout: 3000,
  retry: { retries: 10 },
});

async function run() {
  // Listen for the "data" topic
  const consumer = kafka.consumer({
    groupId: "data-processing",
    retry: { retries: 10 },
    allowAutoTopicCreation: true,
  });
  await consumer.connect();

  do {
    try {
      await consumer.subscribe({
        topic: "twitch-streams",
        fromBeginning: true,
      });
      break;
    } catch (e) {
      console.error("Error subscribing to topic: ", e);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } while (true);

  const producer = kafka.producer();
  await producer.connect();

  const eventHandler = new EventHandler((result) => {
    producer.send({
      topic: "processed-twitch-data",
      messages: [{ value: JSON.stringify(result) }],
    });
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value === null) {
        return;
      }
      eventHandler.addEvent(parseScrapperEvent(message.value.toString()));
    },
  });
}

run();
