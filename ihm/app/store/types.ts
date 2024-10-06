import { z } from "zod";

export const dataPointSchema = z.object({
    timestamp: z.number(),
    totalViewerCount: z.number(),
});

export type DataPoint = z.infer<typeof dataPointSchema>;