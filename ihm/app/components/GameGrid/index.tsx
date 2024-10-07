import { Box, Grid, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Game } from "../../store/types";

interface GameGridProps {
  games: Game[];
}

const GameGrid: React.FC<GameGridProps> = ({ games }) => (
  <Grid templateColumns="repeat(auto-fill, minmax(170px, 1fr))" gap="6">
    {games.map((game) => (
      <Box key={game.id} overflow="hidden">
        <Box className="vignette" overflow="hidden">
          <Image
            className="vignette"
            src={game.box_art_url
              .replace("{width}", "285")
              .replace("{height}", "380")}
            alt={game.name}
          />
        </Box>
        <Text
          className={"text-vignette"}
          fontWeight={"bold"}
          pt={2}
          color="white"
        >
          {game.name}
        </Text>
      </Box>
    ))}
  </Grid>
);

export default GameGrid;
