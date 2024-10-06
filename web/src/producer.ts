import { Kafka } from 'kafkajs';

// Créer une instance de Kafka
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092', 'localhost:39092', 'localhost:49092']
});

const producer = kafka.producer();

const runProducer = async () => {
    // Connexion au producteur
    await producer.connect();

    // Envoyer un message dans le topic 'test-topic'
    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: 'Hello Kafka from TypeScript!' }
        ],
    });

    console.log('Message envoyé !');

    // Déconnexion du producteur
    await producer.disconnect();
};

runProducer().catch(console.error);
