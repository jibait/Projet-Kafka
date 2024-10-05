// app/gamedetails/[gameId].tsx

import { useRouter } from 'next/router';
import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';

const GameDetails: React.FC = () => {
    const router = useRouter();
    const { gameId } = router.query; // Récupérer le gameId des paramètres de l'URL

    return (
        <Box>
            <Text fontSize="2xl">Détails du jeu</Text>
            <Text fontSize="xl">ID du jeu : {gameId}</Text>
            {/* Ajoutez ici d'autres détails sur le jeu, comme l'image et les stats */}
        </Box>
    );
};

export default GameDetails;
