// app/gamedetails/[gameId]/page.tsx
import { useRouter } from 'next/router';
import { Box, Spinner, Text } from '@chakra-ui/react';
import React from 'react';

interface GameDetailsPageProps {
    params: {
        gameId: string;
    };
}

const GameDetailsPage: React.FC<GameDetailsPageProps> = ({ params }) => {
    const { gameId } = params;

    if (!gameId) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    return (
        <Box>
            <Text fontSize="2xl">Détails du jeu</Text>
            <Text fontSize="xl">ID du jeu : {gameId}</Text>
            {/* Autres informations de détails ici */}
        </Box>
    );
};

export default GameDetailsPage;
