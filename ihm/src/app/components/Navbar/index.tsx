"use client";

import React from 'react';
import { Image, Flex, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <Flex justify="space-between" align="center" className="navbar" p="4" color="white" bg="gray.800">
            <Image
                src="/twitch-analyzer.png"
                alt="Logo"
                objectFit="contain"
                width="100%"
                maxWidth="150px"
            />
            <Flex align="center">
                <InputGroup size="md" width={{ base: "200px", md: "300px" }} mr="4">
                    <Input
                        pr="4.5rem"
                        placeholder="Rechercher..."
                        bg="gray.700"
                        color="white"
                        _placeholder={{ color: "gray.400" }}
                    />
                    <InputRightElement>
                        <IconButton
                            aria-label="Search"
                            icon={<FontAwesomeIcon icon={faSearch} />}
                            variant="link"
                            colorScheme="teal"
                        />
                    </InputRightElement>
                </InputGroup>

                <Link href="/viewers-by-game" passHref>
                    <IconButton
                        aria-label="Statistiques des spectateurs par jeu"
                        icon={<FontAwesomeIcon icon={faEdit} />}
                        variant="link"
                        colorScheme="teal"
                        mr="4"
                    />
                </Link>
                <Link href="/viewers-by-language" passHref>
                    <IconButton
                        aria-label="Statistiques des spectateurs par langue"
                        icon={<FontAwesomeIcon icon={faUser} />}
                        variant="link"
                        colorScheme="teal"
                        mr="4"
                    />
                </Link>
                <Link href="/top-streamers" passHref>
                    <IconButton
                        aria-label="Top streamers par audience"
                        icon={<FontAwesomeIcon icon={faUser} />}
                        variant="link"
                        colorScheme="teal"
                        mr="4"
                    />
                </Link>
                <Link href="/viewers-by-language" passHref>
                    <IconButton
                        aria-label="Statistiques par langue"
                        icon={<FontAwesomeIcon icon={faUser} />}
                        variant="link"
                        colorScheme="teal"
                        mr="4"
                    />
                </Link>
            </Flex>
        </Flex>
    );
};

export default Navbar;
