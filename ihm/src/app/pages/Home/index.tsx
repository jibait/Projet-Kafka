import {
    Box,
    Button,
    Heading,
    Text,
    VStack,
    Input,
    Flex,
    Divider,
    SlideFade,
    Fade,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGamepad,
    faGlobe,
    faCrown,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Home: React.FC = () => {
    return (
        <Box>
            {/* Section Présentation du Projet */}
            <Box
                height="100vh"
                bg="gray.800"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                px={4}
            >
                <Fade in>
                    <VStack spacing={4}>
                        <Heading size="2xl" color="white">
                            Twitch Analyzer
                        </Heading>
                        <Text color="gray.300" fontSize="lg">
                            Découvrez les tendances en direct sur Twitch
                        </Text>
                        <Text color="gray.400" fontSize="md">
                            Analyse en temps réel des statistiques des jeux, des langues et
                            des streamers sur Twitch.
                        </Text>
                        <Text color="gray.300" fontSize="md" maxWidth="600px">
                            Bienvenue sur Twitch Analyzer, la plateforme ultime qui vous
                            permet de suivre, en temps réel, les tendances de streaming sur
                            Twitch. Avec notre solution, accédez instantanément aux données les
                            plus précises sur les jeux les plus populaires, les streamers les
                            plus regardés, et les préférences linguistiques des spectateurs.
                        </Text>
                        <Button colorScheme="teal" size="lg" mt="4">
                            Commencez à analyser dès maintenant
                        </Button>
                    </VStack>
                </Fade>
            </Box>

            {/* Séparateur */}
            <Divider orientation="horizontal" borderColor="gray.600" my={10} />

            {/* Section Barre de recherche */}
            <Box mb="10" textAlign="center">
                <SlideFade in offsetY="20px">
                    <Input
                        placeholder="Recherchez un jeu, un streamer, ou une langue..."
                        size="lg"
                        color="white"
                        bg="gray.700"
                        border="none"
                        _placeholder={{ color: "gray.400" }}
                    />
                </SlideFade>
            </Box>

            {/* Séparateur */}
            <Divider orientation="horizontal" borderColor="gray.600" my={10} />

            {/* Section Fonctionnalités principales */}
            <Box textAlign="center" mb="10">
                <Fade in>
                    <Heading size="lg" color="white" mb="6">
                        Fonctionnalités principales
                    </Heading>
                    <Flex
                        justify="space-around"
                        wrap="wrap"
                        maxWidth="1200px"
                        margin="0 auto"
                    >
                        <Feature
                            icon={faGamepad}
                            title="Statistiques en temps réel par jeu"
                            description="Explorez les jeux qui captivent le plus de spectateurs à chaque instant."
                        />
                        <Feature
                            icon={faGlobe}
                            title="Statistiques par langue"
                            description="Découvrez les préférences linguistiques des spectateurs."
                        />
                        <Feature
                            icon={faCrown}
                            title="Top Streamers par audience"
                            description="Identifiez les streamers qui dominent actuellement la plateforme."
                        />
                    </Flex>
                </Fade>
            </Box>

            {/* Séparateur */}
            <Divider orientation="horizontal" borderColor="gray.600" my={10} />

            {/* Section Technologie derrière Twitch Analyzer */}
            <Box textAlign="left" mb="10" px={4}>
                <Fade in>
                    <Heading size="lg" color="white" mb="6">
                        Technologie derrière Twitch Analyzer
                    </Heading>
                    <Text color="gray.300" mb={2}>
                        Notre plateforme est propulsée par des technologies robustes qui
                        garantissent une analyse rapide et fiable des données :
                    </Text>
                    <Text color="gray.300" mb={2}>
                        - <strong>Brocker d’événements</strong> - Nous utilisons Kafka pour
                        collecter, traiter et transmettre les données en temps réel.
                    </Text>
                    <Text color="gray.300" mb={2}>
                        - <strong>Producteur de données</strong> - Nos systèmes extraient des
                        informations brutes directement depuis l'API Twitch.
                    </Text>
                    <Text color="gray.300" mb={2}>
                        - <strong>Traitement des données</strong> - Les données sont
                        traitées puis envoyées vers la base de données et le backend.
                    </Text>
                    <Text color="gray.300" mb={2}>
                        - <strong>Base de données</strong> - Nous utilisons MongoDB pour
                        stocker efficacement les informations sur les jeux, les streamers
                        et les spectateurs.
                    </Text>
                    <Text color="gray.300" mb={2}>
                        - <strong>Web Backend</strong> - Notre backend assure une
                        communication bidirectionnelle avec le frontend.
                    </Text>
                    <Text color="gray.300" mb={2}>
                        - <strong>Web Frontend</strong> - Un design intuitif et interactif
                        pour permettre aux utilisateurs d’accéder rapidement aux
                        statistiques recherchées.
                    </Text>
                </Fade>
            </Box>

            {/* Séparateur */}
            <Divider orientation="horizontal" borderColor="gray.600" my={10} />

            {/* Conclusion */}
            <Box textAlign="center">
                <Fade in>
                    <Heading size="lg" color="white" mb="4">
                        Twitch Analyzer, c’est votre fenêtre ouverte sur les tendances du
                        streaming.
                    </Heading>
                    <Text color="gray.300" mb="4">
                        Explorez, analysez et comprenez les audiences Twitch comme jamais
                        auparavant.
                    </Text>
                    <Button colorScheme="teal" size="lg">
                        Commencez à analyser dès maintenant
                    </Button>
                </Fade>
            </Box>
        </Box>
    );
};

// Composant pour les fonctionnalités
const Feature: React.FC<{
    icon: any;
    title: string;
    description: string;
}> = ({ icon, title, description }) => {
    return (
        <Box
            bg="gray.700"
            p="6"
            borderRadius="md"
            boxShadow="md"
            width={{ base: "100%", md: "30%" }}
            marginY={4}
            transition="0.2s"
            _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            textAlign="center"
        >
            <FontAwesomeIcon icon={icon} size="3x" color="teal.400" />
            <Text fontSize="xl" color="white" fontWeight="bold" mt="3">
                {title}
            </Text>
            <Text color="gray.300" mt="2">
                {description}
            </Text>
        </Box>
    );
};

export default Home;
