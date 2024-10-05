import { useRouter } from "next/router";
import { Box, Image, Text, Heading } from "@chakra-ui/react";
import React from "react";
import { games } from "../mock/game";
import GameDetails from "../components/GameDetails";

const GameDetailsPage: React.FC = () => {
    const router = useRouter();
    const { gameid } = router.query;

    // Cherche les informations du jeu en fonction de gameId
    const game = games.find((g) => g.id === Number(gameid));

    // Vérifie si le jeu existe
    if (!game) {
        return <Text>Jeu non trouvé</Text>;
    }

    return (
        <GameDetails />
    );
};

export default GameDetailsPage;
