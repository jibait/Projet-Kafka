import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { startWebSocketServer } from './websocket';
import { createProducer, sendMessage } from './producer';
import { runKafkaConsumer } from './consumer';
import { getDb } from "./mongodb";

const app = express();
const server = createServer(app);

// Démarrer le serveur WebSocket
startWebSocketServer(server);

// Connexion à MongoDB
const db = getDb();
if (!db) {
    console.error('MongoDB non connecté !!!!!!!!!');
}

// Initialiser le producer Kafka
createProducer().catch(console.error);

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

// Route pour envoyer un message via le producer
// app.post('/send', express.json(), async (req: Request, res: Response): Promise<void> => {
//     const { topic, message } = req.body;
//     if (!topic || !message) {
//         res.status(400).send('Topic et message sont requis');
//         return;
//     }
//     await sendMessage(topic, message);
//     res.send(`Message envoyé au topic ${topic}`);
// });


app.get('/send', express.json(), async (req: Request, res: Response): Promise<void> => {
    let topic = 'mon-topic';
    await sendMessage(topic, 'HELLO KAFKA !!');
    res.send(`Message envoyé au topic ${topic}`);
});

// Démarrer le consumer Kafka
runKafkaConsumer().catch(console.error);

// envoyer un message via le producer
sendMessage('mon-topic', 'Hello Kafka !').catch(console.error);

// Démarrer le serveur HTTP et WebSocket sur le port 3000
server.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
