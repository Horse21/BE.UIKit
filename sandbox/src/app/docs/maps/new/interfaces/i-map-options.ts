import { IPoint } from "./i-point";

export interface IMapOptions {
    center: IPoint;
    zoom: number;
    minZoom: number;
    enableMapClick: boolean;
    enableAutoResize: boolean;
    allowScrolling: boolean;
    allowZooming: boolean;
    enableScaling: boolean;
    enableZoomByDoubleClick: boolean;
    disableDoubleClickZoom: boolean;
    scaleControl: boolean;
    editable: boolean;
    draggable: boolean;
    disableDefaultUI:boolean;
    draggableCursor:string;
}
