export type Stream = {
    timestamp: number;
    streamId: number;
    userId: number;
    gameId: number;
    language: string;
    viewer_count: number;
}

export interface ScrapperEvent {
    timestamp: number;
    downloadIndex: number;
    totalDownloadNumber: number;
    data: Stream[];
}

export function parseScrapperEvent(string: String): ScrapperEvent {
    const lines = string.replace("\r", "").split("\n").filter((line) => line.length > 0);
    const [timestamp, downloadIndex, totalDownloadNumber] = lines[0].split(";").map(Number);
    const data = lines.slice(1).map((line) => {
        const fields = line.split(";");
        const stream: Stream = {
            timestamp,
            streamId: parseInt(fields[0]),
            userId: parseInt(fields[1]),
            gameId: parseInt(fields[2]),
            language: fields[3],
            viewer_count: parseInt(fields[4]),
        }
        return stream;
    });
    return {
        timestamp,
        downloadIndex,
        totalDownloadNumber,
        data,
    }
}