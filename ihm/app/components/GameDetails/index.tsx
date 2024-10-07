import { Box, Image, Heading } from '@chakra-ui/react';
import React from 'react';
import { Game } from '../../store/types';
import { GameViewsChart } from '../Charts/GameViewsChart';

interface GameDetailsProps {
    gameId: string;
    game: Game;
}

const GameDetails: React.FC<GameDetailsProps> = ({ game }) => {
    return (
        <Box display="flex" p={5} border="1px solid" color={"white"} borderColor="gray.700" borderRadius="lg">
            {/* Image à gauche */}
            <Box flex="1" p={3}>
                <Image src={game.box_art_url.replace(
                    '{width}',
                    '285'
                ).replace('{height}', '380'
                )} alt={game.name} borderRadius="md" />
            </Box>

            {/* Détails du jeu à droite */}
            <Box flex="2" p={3}>
                <Heading as="h2" size="lg" mb={3}>{game.name}</Heading>
                <GameViewsChart game={game} />
            </Box>
        </Box>
    );
};

export default GameDetails;
