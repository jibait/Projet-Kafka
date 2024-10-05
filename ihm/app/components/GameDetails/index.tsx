import { Box, Flex, Image, Text, VStack, HStack, Badge, Divider, Spinner } from '@chakra-ui/react';
import React from 'react';

// Interface pour les props de GameDetails
interface GameDetailsProps {
    gameId: string;
    game: {
        name: string;
        cover: string; // URL de la couverture du jeu
        audience: number; // Audience en temps réel
        topStreamers: string[]; // Liste des meilleurs streamers
        description: string; // Description du jeu
        releaseDate: string; // Date de sortie du jeu
        genres: string[]; // Genres du jeu
    };
}

const GameDetails: React.FC<GameDetailsProps> = ({ gameId, game }) => {
    if (!game) {
        // Affiche un spinner si les détails du jeu ne sont pas encore chargés
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    return (
        <Box padding={6} maxW="7xl" mx="auto">
            {/* Titre de la page */}
            <Text fontSize="3xl" fontWeight="bold" mb={6}>
                Détails du jeu : {game.name}
            </Text>

            <Flex direction={{ base: 'column', md: 'row' }} gap={10}>
                {/* Colonne gauche : Image de la couverture du jeu */}
                <Box flex="1" maxW="300px">
                    <Image src={game.cover} alt={game.name} borderRadius="md" boxShadow="lg" />
                </Box>

                {/* Colonne droite : Infos détaillées sur le jeu */}
                <VStack flex="2" align="stretch" spacing={5}>
                    {/* Nom du jeu */}
                    <Text fontSize="2xl" fontWeight="bold">
                        {game.name}
                    </Text>

                    {/* Audience en temps réel */}
                    <HStack spacing={3}>
                        <Text fontSize="lg" fontWeight="semibold">Audience en temps réel :</Text>
                        <Badge colorScheme="green" fontSize="lg">
                            {game.audience.toLocaleString()} viewers
                        </Badge>
                    </HStack>

                    {/* Meilleurs streamers */}
                    <VStack align="start">
                        <Text fontSize="lg" fontWeight="semibold">Top Streamers :</Text>
                        {game.topStreamers.map((streamer, index) => (
                            <Text key={index} fontSize="md">
                                {index + 1}. {streamer}
                            </Text>
                        ))}
                    </VStack>

                    <Divider />

                    {/* Description */}
                    <Text fontSize="lg" fontWeight="semibold">Description :</Text>
                    <Text>{game.description}</Text>

                    {/* Date de sortie */}
                    <HStack spacing={3}>
                        <Text fontSize="lg" fontWeight="semibold">Date de sortie :</Text>
                        <Text>{game.releaseDate}</Text>
                    </HStack>

                    {/* Genres */}
                    <HStack spacing={3}>
                        <Text fontSize="lg" fontWeight="semibold">Genres :</Text>
                        {game.genres.map((genre, index) => (
                            <Badge key={index} colorScheme="purple">
                                {genre}
                            </Badge>
                        ))}
                    </HStack>
                </VStack>
            </Flex>
        </Box>
    );
};

export default GameDetails;
