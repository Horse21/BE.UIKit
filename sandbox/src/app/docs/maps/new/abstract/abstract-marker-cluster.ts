import { AbstractMap } from "./abstract-map";
import { IMarkerClusterOptions } from '../interfaces/i-marker-cluster-options';
import { IPoint } from "../interfaces/i-point";
import { BaseMarker } from "../entity/base-marker";
import { Injectable } from "@angular/core";

@Injectable()
export abstract class AbstractMarkerCluster {

    map: AbstractMap;
    cluster: Array<IPoint>;
    preferences: IMarkerClusterOptions;
    
    abstract addMarker(marker: BaseMarker, show?: boolean): void;

    abstract refreshMarkers(): void;

    abstract removeMarker(marker: BaseMarker);
    
    abstract resetViewport(): void;


}