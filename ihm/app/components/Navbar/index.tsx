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
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearch = () => {
    console.log("searchValue", searchValue);
    if (searchValue) {
      router.push(`/search/${encodeURI(searchValue)}`);
    }
  };

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
      <Link as={NextLink} href="/">
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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <InputRightElement>
            <IconButton
              aria-label="Search"
              icon={<FontAwesomeIcon icon={faSearch} />}
              variant="link"
              colorScheme="purple"
              onClick={handleSearch}
            />
          </InputRightElement>
        </InputGroup>
      </Box>

      <Flex align="center">
        {/* Bouton Vue d'ensemble avec icône */}
        <Link as={NextLink} href="/overview">
          {" "}
          {/* Lien vers la page Vue d'ensemble */}
          <Button
            colorScheme="purple"
            size="sm"
            mx="2"
            leftIcon={<FontAwesomeIcon icon={faChartBar} />}
          >
            Vue d'ensemble
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;
