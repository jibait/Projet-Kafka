import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { startWebSocketServer } from './websocket';
import { createProducer, sendMessage } from './producer';
import { runKafkaConsumer } from './consumer';
import { getDb } from "./mongodb";
import WebSocket from 'ws';  // Import WebSocket pour le client de test

const app = express();
const server = createServer(app);

// Démarrer le serveur WebSocket
const dataCache: string[] = [];  // Stocker les messages en cache
const gameCache = new Map<string, any>();  // Stocker les jeux en cache
startWebSocketServer(server, dataCache, gameCache);  // Passer le cache au serveur WebSocket

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

app.get('/send', express.json(), async (req: Request, res: Response): Promise<void> => {
    let topic = 'mon-topic';
    await sendMessage(topic, 'HELLO KAFKA !!');
    res.send(`Message envoyé au topic ${topic}`);
});

// Démarrer le consumer Kafka
runKafkaConsumer(dataCache, gameCache).catch(console.error);  // Passer dataCache ici

// Démarrer le serveur HTTP et WebSocket sur le port 3001
server.listen(3001, () => {
    console.log('Serveur démarré sur le port 3001');

    // === Code de test WebSocket (simuler un client) ===
    const ws = new WebSocket('ws://localhost:3001');  // Connexion au serveur WebSocket local

    ws.on('open', () => {
        console.log('Client WebSocket de test connecté');
    });

    ws.on('message', (message: string) => {
        console.log(`Message reçu par le client de test : ${message}`);
    });

    ws.on('close', () => {
        console.log('Client WebSocket de test déconnecté');
    });
});
