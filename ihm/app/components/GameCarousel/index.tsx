import { Box, Image, Text, IconButton, HStack } from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { Game } from "../../interfaces/Game";

interface GameGridProps {
    games: Game[];
}

const GameCarousel: React.FC<GameGridProps> = ({ games }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevGame = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? games.length - 1 : prevIndex - 1
        );
    };

    const nextGame = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === games.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <Box position="relative" width="100%" maxWidth="600px" mx="auto">
            <Box position="relative" overflow="hidden" width="100%">
                {/* Jeu actuel */}
                <Box position="relative">
                    <Box
                        position="absolute"
                        top="10px"
                        left="10px"
                        backgroundColor="rgba(0, 0, 0, 0.7)"
                        color="white"
                        borderRadius="50%"
                        width="30px"
                        height="30px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="lg"
                        zIndex={1}
                    >
                        {currentIndex + 1}
                    </Box>
                    <Image
                        className="vignette"
                        src={games[currentIndex].image}
                        alt={games[currentIndex].name}
                        objectFit="cover"
                        width="100%"
                        height="300px"
                    />
                </Box>
                <Text className={"text-vignette"} fontWeight={"bold"} pt={2} color="white">
                    {games[currentIndex].name}
                </Text>
            </Box>

            {/* Boutons pour changer de jeu */}
            <HStack justifyContent="space-between" mt={4}>
                <IconButton
                    aria-label="Previous Game"
                    icon={<FaChevronLeft />}
                    onClick={prevGame}
                />
                <IconButton
                    aria-label="Next Game"
                    icon={<FaChevronRight />}
                    onClick={nextGame}
                />
            </HStack>
        </Box>
    );
};

export default GameCarousel;
