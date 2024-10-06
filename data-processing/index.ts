import { Kafka } from "kafkajs";
import { EventHandler } from "./eventHandler";
import { parseScrapperEvent } from "./event";

const kafka = new Kafka({
  clientId: "data-processing",
  brokers: ["localhost:29092", "localhost:39092", "localhost:49092"],
});

// Listen for the "data" topic
const consumer = kafka.consumer({ groupId: "data-processing" });
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
    console.log(`Received message: ${message.value.toString()}`);
    eventHandler.addEvent(parseScrapperEvent(message.value.toString()));
  },
});
