import { makeAutoObservable } from 'mobx';
import { DataPoint } from './types';

export class Store {
    dataPoints: DataPoint[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addDataPoint(dataPoint: DataPoint) {
        this.dataPoints.push(dataPoint);
    }

}

export const store = new Store();
