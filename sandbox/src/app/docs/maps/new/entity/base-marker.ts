import { AbstractMap } from "../abstract/abstract-map";
import { IPoint } from "../interfaces/i-point";
import { IBaseMarkerOptions } from "../interfaces/i-base-marker-options";

export class BaseMarker {

    map: AbstractMap;
    point: IPoint;
    options: IBaseMarkerOptions;

    constructor(options: IBaseMarkerOptions) {
        this.options = options;
    }

    markerClicked(): void {

    }

}