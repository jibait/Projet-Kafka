import { makeAutoObservable } from 'mobx';
import { DataPoint, Games } from './types';

export class Store {
    dataPoints: DataPoint[] = [];
    games: Games = [];

    constructor() {
        makeAutoObservable(this);
    }

    addDataPoint(dataPoint: DataPoint) {
        if (this.dataPoints.some((dp) => dp.timestamp === dataPoint.timestamp)) {
            return;
        }
        this.dataPoints.push(dataPoint);
    }

    setGames(games: Games) {
        this.games = games;
    }
}

export const store = new Store();
