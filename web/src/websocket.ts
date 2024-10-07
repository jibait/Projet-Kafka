import { Server } from "http";
import WebSocket, { WebSocketServer } from "ws";

interface Client {
  ws: WebSocket;
}

// Tableau pour stocker les clients connectés
let clients: Client[] = [];

// Démarrer le serveur WebSocket
export const startWebSocketServer = (
  server: Server,
  dataCache: string[],
  gamesCache: Map<string, any>
): void => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket) => {
    console.log("Client connecté");

    // Ajouter le client connecté à la liste
    clients.push({ ws });

    // Envoyer les jeux du cache au nouveau client
    ws.send(
      JSON.stringify({ type: "games", data: Array.from(gamesCache.values()) })
    );

    // Envoyer les messages du cache au nouveau client
    dataCache.forEach((message) => {
      ws.send(JSON.stringify({ type: "data", data: message }));
    });

    // Gérer la déconnexion des clients
    ws.on("close", () => {
      console.log("Client déconnecté");
      clients = clients.filter((client) => client.ws !== ws);
    });
  });
};

// Envoyer un message à tous les clients connectés
export const sendMessageToClients = (
  type: "data" | "games",
  msg: any
): void => {
  const message = JSON.stringify({ type, data: msg });

  clients.forEach((client) => {
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(message);
    }
  });
};
