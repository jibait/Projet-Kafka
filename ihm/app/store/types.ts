import { z } from "zod";

export const dataPointSchema = z.object({
  timestamp: z.number(),
  totalViewerCount: z.number(),
  viewersByGame: z.array(z.tuple([z.number(), z.number()])),
  viewersByLanguage: z.array(z.tuple([z.string(), z.number()])),
  totalStreamCount: z.number(),
});

export type DataPoint = z.infer<typeof dataPointSchema>;

export const gameSchema = z.object({
  id: z.string(),
  name: z.string(),
  box_art_url: z.string(),
});

export type Game = z.infer<typeof gameSchema>;

export const gamesSchema = z.array(gameSchema);

export type Games = z.infer<typeof gamesSchema>;

export const messageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("data"),
    data: dataPointSchema,
  }),
  z.object({
    type: z.literal("games"),
    data: gamesSchema,
  }),
]);
