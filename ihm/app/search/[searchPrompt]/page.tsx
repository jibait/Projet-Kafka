"use client";

import { Box, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../Hooks/useStore";
import { Game } from "../../store/types";
import GameCard from "../../components/GameCard";

interface SearchPageProps {
  params: {
    searchPrompt: string;
  };
}

const SearchPage: React.FC<SearchPageProps> = observer(({params}) => {
  const searchPrompt = decodeURI(params.searchPrompt);

  const store = useStore();

  const [results, setResults] = React.useState<Game[] | undefined>([]);

  useEffect(() => {
    const searchResults = store.games.filter((game) =>
      game.name.toLowerCase().includes(searchPrompt.toLowerCase())
    );
    setResults(searchResults);
  }, [searchPrompt, store.games]);

  if (results === undefined) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <div>
      <Heading as="h1" size="lg" mb={5} color={"white"}>
        Test {searchPrompt}
      </Heading>
      <SimpleGrid minChildWidth='285px' spacing='40px'>
        {results.map((game) => (
          <GameCard game={game} key={game.id} />
        ))}
      </SimpleGrid>
    </div>
  );
});

export default SearchPage;
