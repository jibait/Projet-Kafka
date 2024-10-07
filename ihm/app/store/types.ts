import { z } from "zod";

export const dataPointSchema = z.object({
    timestamp: z.number(),
    totalViewerCount: z.number(),
    viewersByGame: z.array(z.tuple([z.number(), z.number()])),
    viewersByLanguage: z.array(z.tuple([z.string(), z.number()])),
    totalStreamCount: z.number(),
});

export type DataPoint = z.infer<typeof dataPointSchema>;