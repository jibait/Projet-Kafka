"use client";

import React from "react";
import {
    Image,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Box,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Link,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faSearch, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
    return (
        <Flex
            justify="space-between"
            align="center"
            className="navbar"
            p="2"
            color="white"
            bg="gray.800"
            position="sticky"
            top="0"
            zIndex="1000"
        >
            <Link href="/">
                <Image
                    src="/twitch-analyzer.png"
                    alt="Logo"
                    objectFit="contain"
                    width="100%"
                    maxWidth="150px"
                />
            </Link>

            <Box flexGrow={1} mx="4">
                <InputGroup size="md" width={{ base: "120px", md: "550px" }} mx="auto">
                    <Input
                        pr="3rem"
                        placeholder="Recherchez un jeu, un streamer, ou une langue..."
                        bg="gray.700"
                        color="white"
                        _placeholder={{ color: "gray.400" }}
                    />
                    <InputRightElement>
                        <IconButton
                            aria-label="Search"
                            icon={<FontAwesomeIcon icon={faSearch} />}
                            variant="link"
                            colorScheme="purple"
                        />
                    </InputRightElement>
                </InputGroup>
            </Box>

            <Flex align="center">
                {/* Bouton Vue d'ensemble avec icône */}
                <Link href="/overview"> {/* Lien vers la page Vue d'ensemble */}
                    <Button colorScheme="purple" size="sm" mx="2" leftIcon={<FontAwesomeIcon icon={faChartBar} />}>
                        Vue d'ensemble
                    </Button>
                </Link>


                {/* Menu Statistiques spécifiques avec icône */}
                <Menu>
                    <MenuButton
                        as={Button}
                        size={"sm"}
                        colorScheme="purple"
                        rightIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        mx="2"
                    >
                        Statistiques spécifiques
                    </MenuButton>
                    <MenuList>
                        <MenuItem color={"grey"}>
                            Spectateurs par jeu
                        </MenuItem>
                        <MenuItem color={"grey"}>
                            Top streamers par audience
                        </MenuItem>
                        <MenuItem color={"grey"}>
                            Spectateurs par langue
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    );
};

export default Navbar;
