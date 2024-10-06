import { Kafka } from "kafkajs";
import { EventHandler } from "./eventHandler";
import { parseScrapperEvent } from "./event";

const defaultBrokers = ["localhost:29092", "localhost:39092", "localhost:49092"];
const brokers = process.env.KAFKA_BROKERS ? process.env.KAFKA_BROKERS.split(",") : defaultBrokers;

console.log("Starting data processing service with brokers: ", brokers);

const kafka = new Kafka({
  clientId: "data-processing",
  brokers,
  connectionTimeout: 3000,
  retry: { retries: 10 },
});

// Listen for the "data" topic
const consumer = kafka.consumer({ groupId: "data-processing", allowAutoTopicCreation: true });
consumer.connect();
consumer.subscribe({ topic: "twitch-streams", fromBeginning: true });

const producer = kafka.producer({ allowAutoTopicCreation: true });
producer.connect();

const eventHandler = new EventHandler((result) => {
  producer.send({
    topic: "processed-twicth-data",
    messages: [{ value: JSON.stringify(result) }],
  });
});

consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    if (message.value === null) {
      return;
    }
    eventHandler.addEvent(parseScrapperEvent(message.value.toString()));
  },
});
