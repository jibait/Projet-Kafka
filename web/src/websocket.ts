import { Server } from 'http';
import WebSocket, { WebSocketServer } from 'ws';

interface Client {
    ws: WebSocket;
}

// Tableau pour stocker les clients connectés
let clients: Client[] = [];

// Fonction pour démarrer le serveur WebSocket
export const startWebSocketServer = (server: Server): void => {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws: WebSocket) => {
        console.log('Client connecté');

        // Ajouter le client connecté à la liste
        clients.push({ ws });

        // Gérer la déconnexion des clients
        ws.on('close', () => {
            console.log('Client déconnecté');
            clients = clients.filter(client => client.ws !== ws);
        });
    });
};

// Fonction pour envoyer un message à tous les clients connectés
export const sendMessageToClients = (msg: string): void => {
    clients.forEach(client => {
        if (client.ws.readyState === WebSocket.OPEN) {
            client.ws.send(msg);
        }
    });
};
