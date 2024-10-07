import { Store } from "../store/Store";
import { messageSchema } from "../store/types";

type ComServiceParams = {
    url: string;
    store: Store;
}

export class ComService {

    url: string;
    store: Store;
    webSocket: WebSocket | undefined;

    constructor(params: ComServiceParams) {
        this.url = params.url;
        this.store = params.store;
        this.createWebSocket();
    }

    createWebSocket() {

        if (this.webSocket !== undefined) {
            return;
        }

        console.log('Websocket creation');

        this.webSocket = new WebSocket(this.url);

        this.webSocket.onopen = () => {
            console.log('Websocket opened');
        }

        this.webSocket.onclose = () => {
            console.log('Websocket closed');
            this.webSocket = undefined;
            this.scheduleReconnect();
        }

        this.webSocket.onerror = (error) => {
            console.error('Websocket error', error);
            this.webSocket?.close();
            this.webSocket = undefined;
            this.scheduleReconnect();
        }

        this.webSocket.onmessage = (message) => {
            this.handleMessage(message);
        }
    }

    private scheduleReconnect() {
        setTimeout(() => {
            this.createWebSocket();
        }, 5000);
    }

    private handleMessage(message: MessageEvent) {
        
        let parsedMessage: unknown;

        try {
            parsedMessage = JSON.parse(message.data);
        } catch (error) {
            console.error('Erreur lors de la lecture du message, JSON invalid', error);
        }

        const parsingResult = messageSchema.safeParse(parsedMessage);
        if (parsingResult.success === false) {
            console.error('Erreur lors de la validation du message', parsingResult.error);
            return;
        }

        console.log('Message parsé : ', parsingResult.data.type);

        if (parsingResult.data.type === 'data') {
            this.store.addDataPoint(parsingResult.data.data);
        } else {
            this.store.setGames(parsingResult.data.data);
        }
    }
}