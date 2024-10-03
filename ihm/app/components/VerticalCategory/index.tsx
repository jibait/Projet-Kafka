import { Heading, Stack } from "@chakra-ui/react";
import React from "react";
import GameGrid from "../GameGrid";
import { Game } from "@/app/interfaces/Game";

// Définition du type pour les catégories
interface VerticalCategoryProps {
    title: string;
    games: Game[];
}

const VerticalCategory: React.FC<VerticalCategoryProps> = ({ title, games }) => (
    <Stack mb="8">
        <Heading size="lg" color="white" mb="4">{title}</Heading>
        <GameGrid games={games} />
    </Stack>
);

export default VerticalCategory;
