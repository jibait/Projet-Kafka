import { Box, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

// Composant pour les fonctionnalités
const Feature: React.FC<{
    icon: any;
    title: string;
    description: string;
}> = ({ icon, title, description }) => {
    return (
        <Box
            bg="purple.500"
            p="6"
            borderRadius="md"
            boxShadow="md"
            width={{ base: "100%", md: "30%" }}
            marginY={4}
            transition="0.2s"
            _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            textAlign="center"
        >
            <FontAwesomeIcon icon={icon} size="3x" color="white" />
            <Text fontSize="xl" color="white" fontWeight="bold" mt="3">
                {title}
            </Text>
            <Text color="gray.300" mt="2">
                {description}
            </Text>
        </Box>
    );
};

export default Feature;