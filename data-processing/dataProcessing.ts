import { Stream } from "./event";

export interface ProcessedDataResult {
  timestamp: number;
  totalViewerCount: number;
  totalStreamCount: number;
  viewersByGame: [number, number][];
  viewersByLanguage: [string, number][];
}

export function getTotalViewerCount(streams: Stream[]) {
  return streams.reduce((acc, stream) => acc + stream.viewer_count, 0);
}

export function getTotalStreamCount(streams: Stream[]) {
  return streams.length;
}

export function getViewersByGame(streams: Stream[]): [number, number][] {
  const viewersByGame: Map<number, number> = new Map();
  streams.forEach((stream) => {
    const currentViewers = viewersByGame.get(stream.gameId) || 0;
    viewersByGame.set(stream.gameId, currentViewers + stream.viewer_count);
  });
  // serialize the map to an array of objects
  return Array.from(viewersByGame)
    .sort((a, b) => (a[1] > b[1] ? -1 : 1))
    .map(([gameId, viewerCount]) => [gameId, viewerCount]);
}

export function getViewersByLanguage(streams: Stream[]): [string, number][] {
  const viewersByLanguage: Map<string, number> = new Map();
  streams.forEach((stream) => {
    const currentViewers = viewersByLanguage.get(stream.language) || 0;
    viewersByLanguage.set(
      stream.language,
      currentViewers + stream.viewer_count
    );
  });
  // serialize the map to an array of objects
  return Array.from(viewersByLanguage)
    .sort((a, b) => (a[1] > b[1] ? -1 : 1))
    .map(([language, viewerCount]) => [language, viewerCount]);
}
