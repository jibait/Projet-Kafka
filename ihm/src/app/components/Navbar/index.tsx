import React from 'react';
import { Flex, Heading, Button } from "@chakra-ui/react";

const Navbar: React.FC = () => (
    <Flex as="nav" justify="space-between" p="4" bg="blue.500" color="white">
        <Heading size="md">Twitch Games Stats</Heading>
        <Flex gap="4">
            <Button variant="link" color="white">Accueil</Button>
            <Button variant="link" color="white">Catégories</Button>
        </Flex>
    </Flex>
);

export default Navbar;
