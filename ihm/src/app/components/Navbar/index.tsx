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
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";

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
            <Image
                src="/twitch-analyzer.png"
                alt="Logo"
                objectFit="contain"
                width="100%"
                maxWidth="150px"
            />

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
                            colorScheme="teal"
                        />
                    </InputRightElement>
                </InputGroup>
            </Box>

            <Flex align="center">
                <Menu>
                    <MenuButton
                        as={Button}
                        size={"sm"}
                        colorScheme="purple"
                        rightIcon={<FontAwesomeIcon icon={faEdit} />}
                        mx="2"
                    >
                        Statistiques des jeux
                    </MenuButton>
                    <MenuList>
                        <MenuItem color={"grey"}>
                            Spectateurs par jeu
                        </MenuItem>
                        <MenuItem color={"grey"}>
                            Top streamers par audience
                        </MenuItem>
                    </MenuList>
                </Menu>

                <Menu>
                    <MenuButton
                        as={Button}
                        colorScheme="purple"
                        size={"sm"}
                        rightIcon={<FontAwesomeIcon icon={faUser} />}
                        mx="2"
                    >
                        Statistiques par langue
                    </MenuButton>
                    <MenuList>
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
