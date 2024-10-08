// src/components/GameCard.tsx
import React from 'react';
import NextLink from 'next/link';
import { Box, Image, Link, Text } from '@chakra-ui/react';
import { Game } from '../../store/types';

interface GameCardProps {
    game: Game;
    number?: number;
}

const GameCard: React.FC<GameCardProps> = ({ game, number }) => (
    <Link as={NextLink} href={`/gamedetails/${game.id}`} passHref>
        <Box
            position="relative"
            overflow="hidden"
            cursor="pointer"
            style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
        >
            {number !== undefined && (
                <Box
                    position="absolute"
                    top="10px"
                    left="10px"
                    backgroundColor="rgba(0, 0, 0, 0.7)"
                    color="white"
                    borderRadius="50%"
                    width="30px"
                    height="30px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="lg"
                    zIndex={1}
                >
                    {number}
                </Box>
            )}

            {/* Image du jeu avec un effet hover */}
            <Box className="vignette" overflow="hidden">
                <Image
                    className="vignette"
                    src={game.box_art_url.replace('{width}', '285').replace('{height}', '380')}
                    alt={game.name}
                    transition="transform 0.3s ease" // Ajout de la transition pour l'animation
                    _hover={{ transform: 'scale(1.05)' }} // Zoom au survol
                />
            </Box>

            <Text
                fontWeight="bold"
                pt={2}
                color="white"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
            >
                {game.name}
            </Text>
        </Box>
    </Link>
);

export default GameCard;
