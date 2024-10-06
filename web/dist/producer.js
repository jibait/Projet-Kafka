"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
// Créer une instance de Kafka
const kafka = new kafkajs_1.Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092', 'localhost:39092', 'localhost:49092']
});
const producer = kafka.producer();
const runProducer = () => __awaiter(void 0, void 0, void 0, function* () {
    // Connexion au producteur
    yield producer.connect();
    // Envoyer un message dans le topic 'test-topic'
    yield producer.send({
        topic: 'test-topic',
        messages: [
            { value: 'Hello Kafka from TypeScript!' }
        ],
    });
    console.log('Message envoyé !');
    // Déconnexion du producteur
    yield producer.disconnect();
});
runProducer().catch(console.error);
