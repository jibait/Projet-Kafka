import { makeAutoObservable } from 'mobx';
import { DataPoint } from './types';

export class Store {
    dataPoints: DataPoint[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addDataPoint(dataPoint: DataPoint) {
        if (this.dataPoints.some((dp) => dp.timestamp === dataPoint.timestamp)) {
            return;
        }
        this.dataPoints.push(dataPoint);
    }

}

export const store = new Store();
