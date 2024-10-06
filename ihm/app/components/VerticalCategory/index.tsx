import { Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { Game } from "../../interfaces/Game";
import GameCarousel from "../GameCarousel";

// Définition du type pour les catégories
interface VerticalCategoryProps {
    title: string;
    games: Game[];
}

const VerticalCategory: React.FC<VerticalCategoryProps> = ({ title, games }) => (
    <Stack mb="8" mt="4">
        <Heading size="lg" color="white" mb="4">{title}</Heading>
        <GameCarousel games={games} />
    </Stack>
);

export default VerticalCategory;
