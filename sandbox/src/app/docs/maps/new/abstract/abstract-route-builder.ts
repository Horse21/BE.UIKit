import { TravelMode } from "../enum/e-travel-mode";
import { IPosition } from "../interfaces/i-position";
import { IRouteOptions } from "../interfaces/i-route-options";
import { AbstractMap } from "./abstract-map";
import { IPoint } from "../interfaces/i-point";
import { Injectable } from "@angular/core";

@Injectable()
export abstract class AbstractRouteBuilder {
    
    map: AbstractMap;

    startPoint: IPoint;
    finishPoint: IPoint;

    routeOptions: IRouteOptions;

    abstract showStartPoint(): void;
    abstract showFinishPoint(): void;
    abstract showRoute(): void;

    build(): AbstractRouteBuilder {
        return this;
    }

    setOptions(routeOptions: IRouteOptions): AbstractRouteBuilder {
        this.routeOptions = routeOptions;
        return this;
    }

    setMap(map: AbstractMap): AbstractRouteBuilder {
        this.map = map;
        return this;
    }

    setStartPoint(point: IPoint) {
        this.startPoint = point;
        return this;
    }

    setFinishPoint(point: IPoint) {
        this.finishPoint = point;
        return this;
    }

    initMap(map: AbstractMap): void {

        this.map = map;
    }

}
