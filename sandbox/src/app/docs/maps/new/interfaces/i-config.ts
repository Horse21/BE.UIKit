import { IPoint } from "./i-point";
import { ShapeType } from "../enum/e-shape-type";
import { BaseMarker } from "../entity/base-marker";
import { IRouteInfo } from "./i-route-info";
import { IPolygonOptions } from "./i-polygon";
import { IPosition } from "./i-position";
import { IEventClikMap } from "../providers/google/interfaces/i-event-clik-map";

export interface IConfig {

    buildRoute(from: IPoint, to: IPoint, show?: boolean): void;
    clearMap(): void;
    drawMarkersOnMap(): void;
    drawShapeOnMap(type: ShapeType): void;
    getAddress(position: Position): Array<IPoint>;
    getZoom(): number;
    markersFitsBounds(): void;
    polygonsContainsMarker(marker: BaseMarker, polygon: IPolygonOptions): boolean;
    radiusContainsMarker(marker: BaseMarker, position: IPosition): number;
    routeInfo(): IRouteInfo;
    zoomIn(): void;
    zoomOut(): void;
    setZoom(zoomLevel: number);
    showMarker(point: IPoint): void;
    toggleMapDragging(enabled?: boolean);
    toggleTrafficJamLayer(show?: boolean);
    toggleTransitLayer(show?: boolean);
    onClickMap(event:IEventClikMap):void;
    
}
