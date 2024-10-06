import { Kafka, EachMessagePayload } from 'kafkajs';
import { sendMessageToClients } from './websocket';
import { getDb } from './mongodb';

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['broker-1:19092', 'broker-2:19092', 'broker-3:19092'],
});

const consumer = kafka.consumer({ groupId: 'group-id' });

// Fonction pour démarrer le consumer Kafka
export const runKafkaConsumer = async () => {
    try {
        await consumer.connect();
        await consumer.subscribe({ topic: 'mon-topic', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
                const msg = message.value?.toString() || '';
                console.log(`Message reçu: ${msg}`);

                // Envoyer le message au client WebSocket
                sendMessageToClients(msg);
            },
        });

        console.log('Consumer Kafka démarré');
    } catch (error) {
        console.error('Erreur lors du démarrage du consumer Kafka :', error);
    }
};
