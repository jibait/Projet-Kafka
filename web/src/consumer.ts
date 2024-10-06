import { Kafka } from 'kafkajs';

// Créer une instance de Kafka
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092', 'localhost:39092', 'localhost:49092']
});

const consumer = kafka.consumer({ groupId: 'my-group' });

const runConsumer = async () => {
    // Connexion au consommateur
    await consumer.connect();

    // S'abonner au topic 'test-topic'
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    // Lire les messages du topic
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString(),
            });
        },
    });
};

runConsumer().catch(console.error);
