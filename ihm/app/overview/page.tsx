"use client";

import React from "react";
import {
    Box,
    Heading,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faGamepad, faMicrophone, faGlobe } from "@fortawesome/free-solid-svg-icons";
import VerticalCategory from "../components/VerticalCategory";
import { Game } from "../interfaces/Game";

type Category = {
    title: string;
    games: Game[];
};

const categories: Category[] = [
    {
        title: "Jeux les plus populaires du moment",
        games: [
            { id: 1, name: "Just Chatting", image: "/mock/just-chating.jpg" },
            { id: 2, name: "League of Legends", image: "/mock/lol.jpg" },
            { id: 3, name: "Grand Theft Auto V", image: "/mock/gta-v.jpg" },
            { id: 4, name: "Valorant", image: "/mock/valorant.png" },
            { id: 5, name: "Minecraft", image: "/mock/minecraft.jpg" },
        ],
    },
    {
        title: "Jeux les plus populaires en France",
        games: [
            { id: 1, name: "Just Chatting", image: "/mock/just-chating.jpg" },
            { id: 2, name: "League of Legends", image: "/mock/lol.jpg" },
            { id: 3, name: "Grand Theft Auto V", image: "/mock/gta-v.jpg" },
            { id: 4, name: "Valorant", image: "/mock/valorant.png" },
            { id: 5, name: "Minecraft", image: "/mock/minecraft.jpg" },
        ],
    },
    {
        title: "Streamers les plus populaires en langue française",
        games: [
            { id: 1, name: "Just Chatting", image: "/mock/just-chating.jpg" },
            { id: 2, name: "League of Legends", image: "/mock/lol.jpg" },
            { id: 3, name: "Grand Theft Auto V", image: "/mock/gta-v.jpg" },
            { id: 4, name: "Valorant", image: "/mock/valorant.png" },
            { id: 5, name: "Minecraft", image: "/mock/minecraft.jpg" },
            { id: 6, name: "World of Warcraft", image: "/mock/wow.png" },
            { id: 7, name: "Rocket League", image: "/mock/rocket.jpg" },
            { id: 8, name: "EA Sports FC 25", image: "/mock/ea-fc.jpg" },
            { id: 9, name: "Super Smash Bros Ultimate", image: "/mock/ssb.jpg" },
            { id: 10, name: "Elden Ring", image: "/mock/eldenring.jpg" },
        ],
    },
    {
        title: "Streamers les plus populaires en langue anglaise",
        games: [
            { id: 1, name: "Just Chatting", image: "/mock/just-chating.jpg" },
            { id: 2, name: "League of Legends", image: "/mock/lol.jpg" },
            { id: 3, name: "Grand Theft Auto V", image: "/mock/gta-v.jpg" },
            { id: 4, name: "Valorant", image: "/mock/valorant.png" },
            { id: 5, name: "Minecraft", image: "/mock/minecraft.jpg" },
        ],
    },
];

const Overview: React.FC = () => {
    const statsData = [
        {
            category: "Spectateurs",
            value: 1200,
            description: "Total de spectateurs en direct",
            icon: faUsers,
        },
        {
            category: "Jeux populaires",
            value: 35,
            description: "Nombre de jeux avec le plus de spectateurs",
            icon: faGamepad,
        },
        {
            category: "Streamers",
            value: 500,
            description: "Nombre total de streamers actifs",
            icon: faMicrophone,
        },
        {
            category: "Langues",
            value: 10,
            description: "Nombre de langues parlées par les streamers",
            icon: faGlobe,
        },
    ];

    return (
        <Box p={5}>
            <Heading as="h2" mb={6} color={"white"}>
                Twitch en direct
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} color={"white"} spacing={10} m={4}>
                {statsData.map((stat, index) => (
                    <Stat key={index} borderWidth={1} borderRadius="lg" p={4} shadow="md">
                        <FontAwesomeIcon icon={stat.icon} size="2x" style={{ marginBottom: "10px", color: "#bf94ff" }} />
                        <StatLabel fontSize="lg">{stat.category}</StatLabel>
                        <StatNumber fontSize="2xl">{stat.value}</StatNumber>
                        <StatHelpText>{stat.description}</StatHelpText>
                    </Stat>
                ))}
            </SimpleGrid>
            {categories.map((category) => (
                <VerticalCategory key={category.title} title={category.title} games={category.games} />
            ))}
        </Box>
    );
};

export default Overview;
