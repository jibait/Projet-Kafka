import React from 'react';
import { Box, Flex, Heading, Text, Image, UnorderedList, ListItem } from '@chakra-ui/react';

const Footer: React.FC = () => {
    return (
        <Box as="footer" className="footer-container" bg="gray.800" color="white" p={6}>
            <Flex
                justify="space-between"
                align="flex-start"
                flexDirection={{ base: "column", md: "row" }}
                maxW="1200px"
                margin="0 auto"
            >
                <Box className="footer-credits-container" mb={{ base: 6, md: 0 }}>
                    <Heading as="h3" size="lg" mb={2}>Credits</Heading>
                    <UnorderedList className="footer-credits-list">
                        <ListItem>Etienne Chevrolier</ListItem>
                        <ListItem>Clément Cuvier</ListItem>
                        <ListItem>Frédéric Hilleriteau</ListItem>
                        <ListItem>Jean-Baptiste Lelandais</ListItem>
                        <ListItem>Lino Moreau</ListItem>
                    </UnorderedList>
                </Box>
                <Box className="footer-stack-container">
                    <Heading as="h3" size="lg" mb={2}>Technologies</Heading>
                    <Flex className="footer-stack-logos" justify="flex-start" wrap="wrap">
                        <Image className="footer-stack-logo-1x1" src="./logos/react.png" width="5em" alt="React" height="auto" maxH="50px" />
                        <Image className="footer-stack-logo-rect-XL" src="./logos/kafka.png" width="5em" alt="Apache Kafka" height="auto" maxH="100px" />
                        <Image className="footer-stack-logo-rect" src="./logos/mongodb.png" width="5em" alt="MongoDB" height="auto" maxH="80px" />
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

export default Footer;
