import { Stream } from "./event";

export interface ProcessedDataResult {
  timestamp: number;
  totalViewerCount: number;
  //   viewersByGame: { gameId: number; viewerCount: number }[];
  //   viewersByLanguage: { language: string; viewerCount: number }[];
  //   viewersByGameAndLanguage: {
  //     gameId: number;
  //     viewersByLanguage: { language: string; viewerCount: number }[];
  //   }[];
}

export function getTotalViewerCount(streams: Stream[]) {
  return streams.reduce((acc, stream) => acc + stream.viewer_count, 0);
}

export function getViewersByGame(streams: Stream[]) {
  const viewersByGame: Map<number, number> = new Map();
  streams.forEach((stream) => {
    const currentViewers = viewersByGame.get(stream.gameId) || 0;
    viewersByGame.set(stream.gameId, currentViewers + stream.viewer_count);
  });
  // serialize the map to an array of objects
  return Array.from(viewersByGame).map(([gameId, viewerCount]) => ({
    gameId,
    viewerCount,
  }));
}

export function getViewersByGameAndLanguage(stream: Stream[]) {
  const viewersByGameAndLanguage: Map<number, Map<string, number>> = new Map();
  stream.forEach((stream) => {
    let viewersByLanguage = viewersByGameAndLanguage.get(stream.gameId);
    if (viewersByLanguage === undefined) {
      viewersByLanguage = new Map();
      viewersByGameAndLanguage.set(stream.gameId, viewersByLanguage);
    }
    const currentViewers = viewersByLanguage.get(stream.language) || 0;
    viewersByLanguage.set(
      stream.language,
      currentViewers + stream.viewer_count
    );
  });
  // serialize the map to an array of objects
  return Array.from(viewersByGameAndLanguage).map(
    ([gameId, viewersByLanguage]) => ({
      gameId,
      viewersByLanguage: Array.from(viewersByLanguage).map(
        ([language, viewerCount]) => ({ language, viewerCount })
      ),
    })
  );
}

export function getViewersByLanguage(streams: Stream[]) {
  const viewersByLanguage: Map<string, number> = new Map();
  streams.forEach((stream) => {
    const currentViewers = viewersByLanguage.get(stream.language) || 0;
    viewersByLanguage.set(
      stream.language,
      currentViewers + stream.viewer_count
    );
  });
  // serialize the map to an array of objects
  return Array.from(viewersByLanguage).map(([language, viewerCount]) => ({
    language,
    viewerCount,
  }));
}
