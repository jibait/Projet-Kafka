import { Box, Grid, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Game } from "../../interfaces/Game";

interface GameGridProps {
    games: Game[];
}

const GameGrid: React.FC<GameGridProps> = ({ games }) => (
    <Grid templateColumns="repeat(auto-fill, minmax(150px, 1fr))" gap="6">
        {games.map((game) => (
            <Box key={game.id} bg="gray.700" borderRadius="md" overflow="hidden">
                <Image src={game.image} alt={game.name} />
                <Text p="2" color="white">{game.name}</Text>
            </Box>
        ))}
    </Grid>
);

export default GameGrid;
