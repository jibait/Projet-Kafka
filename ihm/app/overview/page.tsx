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
    StatGroup,
} from "@chakra-ui/react";

const Overview: React.FC = () => {
    // Remplace ces données par tes statistiques réelles
    const statsData = [
        {
            category: "Spectateurs",
            value: 1200,
            description: "Total de spectateurs en direct",
        },
        {
            category: "Jeux populaires",
            value: 35,
            description: "Nombre de jeux avec le plus de spectateurs",
        },
        {
            category: "Streamers",
            value: 500,
            description: "Nombre total de streamers actifs",
        },
        {
            category: "Langues",
            value: 10,
            description: "Nombre de langues parlées par les streamers",
        },
    ];

    return (
        <Box p={5}>
            <Heading as="h2" mb={6}>
                Vue d'ensemble des statistiques
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                {statsData.map((stat, index) => (
                    <Stat key={index} borderWidth={1} borderRadius="lg" p={4} shadow="md">
                        <StatLabel fontSize="lg">{stat.category}</StatLabel>
                        <StatNumber fontSize="2xl">{stat.value}</StatNumber>
                        <StatHelpText>{stat.description}</StatHelpText>
                    </Stat>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default Overview;
