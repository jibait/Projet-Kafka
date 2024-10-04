import {
    Box,
    Button,
    Heading,
    Text,
    VStack,
    Flex,
    Divider,
    Fade,
    Link,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGamepad,
    faGlobe,
    faCrown,
    faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Feature from "./components/Feature";

const Home: React.FC = () => {
    return (
        <Box>
            {/* Section Présentation du Projet */}
            <Box
                height="88vh"
                bg="gray.800"
                bgImage="url('/twitch-illustration.jpg')"
                bgPosition="center"
                bgRepeat="no-repeat"
                bgSize="cover"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                px={4}
            >
                {/* Carte floue et transparente */}
                <Box
                    bg="rgba(0, 0, 0, 0.7)" // Couleur de fond noir transparent
                    backdropFilter="blur(10px)" // Effet de flou
                    borderRadius="md"
                    p={6}
                    mt={34}
                >
                    <Fade in>
                        <VStack spacing={4}>
                            <Text color="gray.300" fontSize="lg">
                                Découvrez les tendances en direct sur Twitch
                            </Text>
                            <Text color="gray.300" fontSize="md" maxWidth="600px">
                                Bienvenue sur Twitch Analyzer, la plateforme ultime qui vous
                                permet de suivre, en temps réel, les tendances de streaming sur
                                Twitch. Avec notre solution, accédez instantanément aux données les
                                plus précises sur les jeux les plus populaires, les streamers les
                                plus regardés, et les préférences linguistiques des spectateurs.
                            </Text>

                            <Button colorScheme="purple" size="lg" mt="4">
                                Commencez à analyser dès maintenant
                            </Button>
                        </VStack>
                    </Fade>
                </Box>
                {/* Flèche vers le bas */}
                <Box mt={6}>
                    <Link href="/overview">
                        <Text color="gray.300" mb={2}>En savoir plus</Text>
                    </Link>
                    <FontAwesomeIcon icon={faArrowDown} size="2x" color="white" />
                </Box>
            </Box>

            {/* Séparateur */}
            <Divider orientation="horizontal" borderColor="gray.600" my={10} />

            {/* Section Fonctionnalités principales */}
            <Box textAlign="center" mb="10">
                <Fade in>
                    <Heading size="lg" color="white" mb="6">
                        Les fonctionnalités de Twitch Analyzer
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
            <Box textAlign="left" mb="10" px={10}>
                <Fade in>
                    <Heading size="lg" color="white" mb="6">
                        Technologie derrière Twitch Analyzer
                    </Heading>
                    <Text color="gray.300" mb={2}>
                        Notre plateforme est propulsée par des technologies robustes qui
                        garantissent une analyse rapide et fiable des données :
                    </Text>
                    <Text color="gray.300" mb={2}>
                        ➜ <strong>Brocker d’événements</strong> - Nous utilisons Kafka pour
                        collecter, traiter et transmettre les données en temps réel.
                    </Text>
                    <Text color="gray.300" mb={2}>
                        ➜ <strong>Producteur de données</strong> - Nos systèmes extraient des
                        informations brutes directement depuis l'API Twitch.
                    </Text>
                    <Text color="gray.300" mb={2}>
                        ➜ <strong>Traitement des données</strong> - Les données sont
                        traitées puis envoyées vers la base de données et le backend.
                    </Text>
                    <Text color="gray.300" mb={2}>
                        ➜ <strong>Base de données</strong> - Nous utilisons MongoDB pour
                        stocker efficacement les informations sur les jeux, les streamers
                        et les spectateurs.
                    </Text>
                    <Text color="gray.300" mb={2}>
                        ➜ <strong>Web Backend</strong> - Notre backend assure une
                        communication bidirectionnelle avec le frontend.
                    </Text>
                    <Text color="gray.300" mb={2}>
                        ➜ <strong>Web Frontend</strong> - Un design intuitif et interactif
                        pour permettre aux utilisateurs d’accéder rapidement aux
                        statistiques recherchées.
                    </Text>
                </Fade>
            </Box>

            {/* Séparateur */}
            <Divider orientation="horizontal" borderColor="gray.600" my={10} />

            {/* Conclusion */}
            <Box textAlign="center" m={8}>
                <Fade in>
                    <Heading size="lg" color="white" mb="4">
                        Twitch Analyzer, c’est votre fenêtre ouverte sur les tendances du
                        streaming.
                    </Heading>
                    <Text color="gray.300" mb="4">
                        Explorez, analysez et comprenez les audiences Twitch comme jamais
                        auparavant.
                    </Text>
                    <Link href="/overview">
                        <Button colorScheme="purple" size="lg">
                            Commencez à analyser dès maintenant
                        </Button>
                    </Link>
                </Fade>
            </Box>
        </Box >
    );
};

export default Home;