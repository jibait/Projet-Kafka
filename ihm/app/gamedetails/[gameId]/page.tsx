"use client";

import { Box, Spinner } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import GameDetails from '../../components/GameDetails';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../Hooks/useStore';
import { Game } from '../../store/types';

interface GameDetailsPageProps {
    params: {
        gameId: string;
    };
}

const GameDetailsPage: React.FC<GameDetailsPageProps> = observer(({ params }) => {
    const { gameId } = params;

    const store = useStore();

    const [result, setResult] = React.useState<Game | undefined>(undefined);

    useEffect(() => {
        const searchResult = store.games.find((game) =>
            game.id === gameId
        );
        setResult(searchResult);
    }, [gameId, store.games]);

    if (result === undefined) {
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
                game={result}
            />
        </Box>
    );
});

export default GameDetailsPage;
