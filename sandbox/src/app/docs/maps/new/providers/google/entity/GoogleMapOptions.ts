import { IMapOptions } from "../../../interfaces/i-map-options";
import { IPoint } from "../../../interfaces/i-point";
import { Injectable } from "@angular/core";
declare var google;


@Injectable()
export class GoogleMapOptions implements IMapOptions {
    center: IPoint;
    zoom: number;
    minZoom: number;
    enableMapClick: boolean;
    enableAutoResize: boolean;
    allowScrolling: boolean;
    allowZooming: boolean;
    enableScaling: boolean;
    enableZoomByDoubleClick: boolean;
    editable: boolean;
    draggable: boolean;
    
    constructor() {
        this.center = new google.maps.LatLng(27.215556209029693, 18.45703125);
        this.zoom = 8;
    }
}
