import { AbstractMap } from "../abstract/abstract-map";
import { IPoint } from "../interfaces/i-point";
import { IBaseMarkerOptions } from "../interfaces/i-base-marker-options";
import { IPosition } from "../interfaces/i-position";

export class BaseMarker {

    map: AbstractMap;
    point: IPosition;
    options: IBaseMarkerOptions;

    constructor(options: IBaseMarkerOptions) {
        this.options = options;
    }

    markerClicked(): void {

    }

    setMap(map: null): void {

    }

}