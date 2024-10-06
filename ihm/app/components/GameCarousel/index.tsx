import { Box, Grid, IconButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Game } from "../../interfaces/Game";
import GameCard from "../GameCard";

interface GameGridProps {
    games: Game[];
}

const GameCarousel: React.FC<GameGridProps> = ({ games }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [gamesPerPage, setGamesPerPage] = useState(4);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const updateGamesPerPage = () => {
            const screenWidth = window.innerWidth;

            if (screenWidth >= 1200) {
                setGamesPerPage(5);
            } else if (screenWidth >= 768) {
                setGamesPerPage(4);
            } else {
                setGamesPerPage(2);
            }
        };

        updateGamesPerPage();
        window.addEventListener("resize", updateGamesPerPage);

        return () => window.removeEventListener("resize", updateGamesPerPage);
    }, []);

    const totalPages = Math.ceil(games.length / gamesPerPage);

    const prevPage = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentPage((prevPage) => (prevPage === 0 ? totalPages - 1 : prevPage - 1));
                setIsTransitioning(false);
            }, 300);
        }
    };

    const nextPage = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentPage((prevPage) => (prevPage === totalPages - 1 ? 0 : prevPage + 1));
                setIsTransitioning(false);
            }, 300);
        }
    };

    const startIndex = currentPage * gamesPerPage;
    const visibleGames = games.slice(startIndex, startIndex + gamesPerPage);

    return (
        <Box position="relative" width="100%" mx="auto" overflow="hidden">
            {games.length > gamesPerPage && (
                <IconButton
                    aria-label="Previous Page"
                    icon={<FontAwesomeIcon icon={faChevronLeft} />}
                    onClick={prevPage}
                    position="absolute"
                    left="0"
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex={2}
                    variant="link"
                    color="white"
                    fontSize="24px"
                />
            )}

            <Grid
                templateColumns={`repeat(${gamesPerPage}, 1fr)`}
                gap="6"
                mx="10%"
                className={isTransitioning ? "carousel-transition" : ""}
            >
                {visibleGames.map((game, index) => (
                    <GameCard key={game.id} game={game} number={startIndex + index + 1} />
                ))}
            </Grid>

            {games.length > gamesPerPage && (
                <IconButton
                    aria-label="Next Page"
                    icon={<FontAwesomeIcon icon={faChevronRight} />}
                    onClick={nextPage}
                    position="absolute"
                    right="0"
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex={2}
                    variant="link"
                    color="white"
                    fontSize="24px"
                />
            )}
        </Box>
    );
};

export default GameCarousel;
