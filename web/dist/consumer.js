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
const consumer = kafka.consumer({ groupId: 'my-group' });
const runConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    // Connexion au consommateur
    yield consumer.connect();
    // S'abonner au topic 'test-topic'
    yield consumer.subscribe({ topic: 'test-topic', fromBeginning: true });
    // Lire les messages du topic
    yield consumer.run({
        eachMessage: (_a) => __awaiter(void 0, [_a], void 0, function* ({ topic, partition, message }) {
            var _b;
            console.log({
                partition,
                offset: message.offset,
                value: (_b = message.value) === null || _b === void 0 ? void 0 : _b.toString(),
            });
        }),
    });
});
runConsumer().catch(console.error);
