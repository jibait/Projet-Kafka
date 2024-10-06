import { Server } from 'http';
import WebSocket, { WebSocketServer } from 'ws';

interface Client {
    ws: WebSocket;
}

// Tableau pour stocker les clients connectés
let clients: Client[] = [];

// Démarrer le serveur WebSocket
export const startWebSocketServer = (server: Server, messagesCache: string[]): void => {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws: WebSocket) => {
        console.log('Client connecté');

        // Ajouter le client connecté à la liste
        clients.push({ ws });

        // Envoyer les messages du cache au nouveau client
        messagesCache.forEach((message) => {
            ws.send(message);
        });

        // Gérer la déconnexion des clients
        ws.on('close', () => {
            console.log('Client déconnecté');
            clients = clients.filter(client => client.ws !== ws);
        });
    });
};

// Envoyer un message à tous les clients connectés
export const sendMessageToClients = (msg: string, messagesCache: string[]): void => {
    // Stocker le message dans le cache
    messagesCache.push(msg);

    clients.forEach(client => {
        if (client.ws.readyState === WebSocket.OPEN) {
            client.ws.send(msg);
        }
    });
};
