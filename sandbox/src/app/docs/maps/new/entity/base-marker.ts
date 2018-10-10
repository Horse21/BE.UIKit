import { AbstractMap } from "../abstract/abstract-map";
import { IPoint } from "../interfaces/i-point";
import { IBaseMarkerOptions } from "../interfaces/i-base-marker-options";
import { IPosition } from "../interfaces/i-position";
import { LatLng } from "../providers/google/interfaces/i-inner";
import { ILatLng } from "../providers/google/interfaces/i-latlng";

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