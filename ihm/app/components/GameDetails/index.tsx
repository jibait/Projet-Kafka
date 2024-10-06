import { Box, Image, Text, List, ListItem, Heading } from '@chakra-ui/react';
import React from 'react';

interface GameDetailsProps {
    gameId: string;
    game: {
        name: string;
        image: string;
        audience: number;
        topStreamers: string[];
        description: string;
        releaseDate: string;
        genres: string[];
    };
}

const GameDetails: React.FC<GameDetailsProps> = ({ game }) => {
    return (
        <Box display="flex" p={5} border="1px solid" color={"white"} borderColor="gray.700" borderRadius="lg">
            {/* Image à gauche */}
            <Box flex="1" p={3}>
                <Image src={game.image} alt={game.name} borderRadius="md" />
            </Box>

            {/* Détails du jeu à droite */}
            <Box flex="2" p={3}>
                <Heading as="h2" size="lg" mb={3}>{game.name}</Heading>
                <Text fontSize="md" mb={3}><strong>Audience en temps réel:</strong> {game.audience} spectateurs</Text>
                <Text fontSize="md" mb={3}><strong>Description:</strong> {game.description}</Text>
                <Text fontSize="md" mb={3}><strong>Date de sortie:</strong> {game.releaseDate}</Text>
                <Text fontSize="md" mb={3}><strong>Genres:</strong> {game.genres.join(', ')}</Text>

                {/* Liste des top streamers */}
                <Heading as="h3" size="md" mb={2}>Top streamers</Heading>
                <List spacing={2}>
                    {game.topStreamers.map((streamer, index) => (
                        <ListItem key={index}>• {streamer}</ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default GameDetails;
