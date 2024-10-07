import { getTotalViewerCount, getViewersByGame, getViewersByLanguage, ProcessedDataResult } from "./dataProcessing";
import { ScrapperEvent, Stream } from "./event";

export interface ScrapperEventDownload {
    timestamp: number;
    receivedScrapperEventNumber: number;
    expectedScrapperEventNumber: number;
    data: Map<number, Stream>;
}

export class EventHandler {

    private partialDownloads: Map<number, ScrapperEventDownload> = new Map();

    private resultListener: (result: ProcessedDataResult) => void;

    constructor(resultListener: (result: ProcessedDataResult) => void) {
        this.resultListener = resultListener;
    }

    addEvent(event: ScrapperEvent) {
        let partialDownload = this.partialDownloads.get(event.timestamp);

        if (partialDownload === undefined) {
            partialDownload = {
                timestamp: event.timestamp,
                receivedScrapperEventNumber: 1,
                expectedScrapperEventNumber: event.totalDownloadNumber,
                data: new Map(),
            };
        } else {
            partialDownload.receivedScrapperEventNumber += 1;
        }

        event.data.forEach((stream) => {
            partialDownload.data.set(stream.streamId, stream);
        });

        console.log(`Event received: ${event.timestamp} - ${partialDownload.receivedScrapperEventNumber}/${partialDownload.expectedScrapperEventNumber}`);

        if (partialDownload.receivedScrapperEventNumber === partialDownload.expectedScrapperEventNumber) {
            console.log("Download completed: ", partialDownload.timestamp);
            this.partialDownloads.delete(event.timestamp);
            this.processDownload(partialDownload);
        } else {
            this.partialDownloads.set(event.timestamp, partialDownload);
        }
    }

    private processDownload(download: ScrapperEventDownload) {
        const streams = Array.from(download.data.values());
        const result: ProcessedDataResult = {
            timestamp: download.timestamp,
            totalViewerCount: getTotalViewerCount(streams),
            viewersByGame: getViewersByGame(streams),
            viewersByLanguage: getViewersByLanguage(streams),
        }
        console.log(`Result for download ${download.timestamp} : `, JSON.stringify(result));
        this.resultListener(result);
    }
}