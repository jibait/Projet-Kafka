import { getViewersByGame, getViewersByGameAndLanguage, getViewersByLanguage, ProcessedDataResult } from "./dataProcessing";
import { ScrapperEvent, Stream } from "./event";

export interface ScrapperEventDownload {
    timestamp: number;
    receivedScrapperEventNumber: number;
    expectedScrapperEventNumber: number;
    data: Stream[];
}

export class EventHandler {

    private partialDownloads: Map<number, ScrapperEventDownload> = new Map();

    private resultListener: (result: ProcessedDataResult) => void;

    constructor(resultListener: (result: ProcessedDataResult) => void) {
        this.resultListener = resultListener;
    }

    addEvent(event: ScrapperEvent) {
        console.log(`Event received: ${event.timestamp} - ${event.downloadIndex}/${event.totalDownloadNumber}`);

        let partialDownload = this.partialDownloads.get(event.timestamp);

        if (partialDownload === undefined) {
            partialDownload = {
                timestamp: event.timestamp,
                receivedScrapperEventNumber: 1,
                expectedScrapperEventNumber: event.totalDownloadNumber,
                data: event.data,
            };
        } else {
            partialDownload.receivedScrapperEventNumber += 1;
            partialDownload.data = partialDownload.data.concat(event.data);
        }

        if (partialDownload.receivedScrapperEventNumber === partialDownload.expectedScrapperEventNumber) {
            console.log("Download completed: ", partialDownload.timestamp);
            this.partialDownloads.delete(event.downloadIndex);
            this.processDownload(partialDownload);
        } else {
            this.partialDownloads.set(event.timestamp, partialDownload);
        }
    }

    private processDownload(download: ScrapperEventDownload) {
        const result: ProcessedDataResult = {
            timestamp: download.timestamp,
            viewersByGame: getViewersByGame(download.data),
            viewersByLanguage: getViewersByLanguage(download.data),
            viewersByGameAndLanguage: getViewersByGameAndLanguage(download.data),
        }
        console.log(`Result for download ${download.timestamp} : `, JSON.stringify(result));
        this.resultListener(result);
    }
}