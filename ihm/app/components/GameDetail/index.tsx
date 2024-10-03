import { Box, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import React from "react";

const GameDetail: React.FC = () => {
    const { gameId } = useParams<{ gameId: string }>(); // Récupère l'id du jeu depuis l'URL

    // Exemple de données pour le graphique
    const data = {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [{
            label: 'Viewers',
            data: [12000, 15000, 18000, 16000, 17000, 22000, 20000],
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
        }]
    };

    return (
        <Box p="8" bg="gray.900" minH="100vh">
            <Heading size="xl" color="white">Détails du jeu : {gameId}</Heading>
            <Text color="gray.300" mt="4">Voici les statistiques du jeu sur la semaine passée :</Text>
            <Box bg="white" p="6" mt="6" borderRadius="md">
                <Line data={data} />
            </Box>
        </Box>
    );
};

export default GameDetail;
