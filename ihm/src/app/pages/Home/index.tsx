import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import NavBar from "../../components/Navbar";
import VerticalCategory from "../../components/VerticalCategory";
import GameGrid from "../../components/GameGrid";

// Définition des types
interface Game {
    id: number;
    name: string;
    image: string;
}

interface Category {
    title: string;
    games: Game[];
}

const Home: React.FC = () => {
    // Exemple de données (remplacer par des résultats d'API)
    const topGames: Game[] = [
        { id: 1, name: 'Game 1', image: '/images/game1.jpg' },
        { id: 2, name: 'Game 2', image: '/images/game2.jpg' },
    ];

    const categories: Category[] = [
        {
            title: "Action",
            games: [
                { id: 3, name: 'Action Game 1', image: '/images/action1.jpg' },
                { id: 4, name: 'Action Game 2', image: '/images/action2.jpg' },
            ]
        },
        {
            title: "RPG",
            games: [
                { id: 5, name: 'RPG Game 1', image: '/images/rpg1.jpg' },
                { id: 6, name: 'RPG Game 2', image: '/images/rpg2.jpg' },
            ]
        }
    ];

    return (
        <Box bg="gray.900" minH="100vh" p="8">
            <NavBar />
            <Box textAlign="center" mb="10">
                <Heading size="2xl" color="white">Bienvenue sur Twitch Games Stats</Heading>
                <Text color="gray.300" mt="4">Suivez les tendances des jeux les plus streamés en temps réel.</Text>
            </Box>

            <Box mb="10">
                <Heading size="lg" color="white" mb="6">Jeux les plus streamés</Heading>
                <GameGrid games={topGames} />
            </Box>

            <Accordion>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                Section 1 title
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                Section 2 title
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            {categories.map((category) => (
                <VerticalCategory key={category.title} title={category.title} games={category.games} />
            ))}
        </Box>
    );
};

export default Home;
