import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    ssl: false,
    clientId: 'my-app',
    brokers: ['broker-1:19092', 'broker-2:19092', 'broker-3:19092'],
});

const producer = kafka.producer();

export const createProducer = async () => {
    await producer.connect();
    console.log('Producer Kafka connecté');
};

export const sendMessage = async (topic: string, message: string) => {
    try {
        await producer.send({
            topic: topic,
            messages: [
                { value: message },
            ],
        });
        console.log(`Message envoyé : ${message}`);
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message :', error);
    }
};
