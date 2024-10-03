import React from 'react';
import Home from './pages/Home';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const IndexPage: React.FC = () => {
    return (
        <Box minH="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Home />
            <Footer />
        </Box>);
};

export default IndexPage;