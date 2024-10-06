import { Box, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import GameDetails from '../../components/GameDetails';
import { games } from '../../mock/game';

interface GameDetailsPageProps {
    params: {
        gameId: string;
    };
}

const GameDetailsPage: React.FC<GameDetailsPageProps> = ({ params }) => {
    const { gameId } = params;

    // Chercher le jeu correspondant à l'ID
    const game = games.find((g) => g.id === Number(gameId));

    if (!gameId || !game) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    return (
        <Box>
            <GameDetails
                gameId={gameId as string}
                game={game}
            />
        </Box>
    );
};

export default GameDetailsPage;
