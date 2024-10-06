import { MongoClient } from 'mongodb';

const url = 'mongodb://mongodb:27017'; // Utilise le nom du service MongoDB
const client = new MongoClient(url);
let db: any;

export const connectToMongo = async () => {
    try {
        await client.connect();
        db = client.db('kafkaMessagesDB');
        console.log('Connecté à MongoDB');
    } catch (err) {
        console.error('Erreur de connexion à MongoDB:', err);
    }
};

export const getDb = () => db;
