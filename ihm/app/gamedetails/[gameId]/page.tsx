"use client";

import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';
import GameDetails from '../../components/GameDetails';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../Hooks/useStore';

interface GameDetailsPageProps {
    params: {
        gameId: string;
    };
}

const GameDetailsPage: React.FC<GameDetailsPageProps> = observer(({ params }) => {
    const { gameId } = params;

    const store = useStore();

    // Chercher le jeu correspondant à l'ID
    const game = store.games.find((g) => g.id === gameId);

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
});

export default GameDetailsPage;
