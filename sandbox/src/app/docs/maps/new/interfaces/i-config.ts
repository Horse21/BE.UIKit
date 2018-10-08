import { IPoint } from "./i-point";
import { ShapeType } from "../enum/e-shape-type";
import { BaseMarker } from "../entity/base-marker";
import { IRouteInfo } from "./i-route-info";
import { IPolygonOptions } from "./i-polygon";
import { IPosition } from "./i-position";
import { IEventClickMap } from "../providers/google/interfaces/i-event-clik-map";
import { ILatLngBounds } from "../providers/google/interfaces/i-latln-bounds";

export interface IConfig {

    buildRoute(from: IPoint, to: IPoint, show?: boolean): void;
    drawMarkersOnMap(): void;
    drawShapeOnMap(type: ShapeType): void;
    getAddress(position: IPosition): Array<IPoint>;
    getDetailsPoint(placeId: string): Array<IPoint>;
    getZoom(): number;
    markersFitsBounds(): void;
    polygonsContainsMarker(marker: BaseMarker, polygon: IPolygonOptions): boolean;
    radiusContainsMarker(marker: BaseMarker, position: IPosition): number;
    boundsContainsMarker(marker: BaseMarker): boolean;
    boundsExtend(bounds: ILatLngBounds, marker: BaseMarker): void;
    routeInfo(): IRouteInfo;
    zoomIn(): void;
    zoomOut(): void;
    setZoom(zoomLevel: number);
    setMinZoom(zoom: number): void;
    setMaxZoom(zoom: number): void;
    setCenter(position: IPosition): void;
    showMarker(point: IPoint): void;
    toggleMapDragging(enabled?: boolean);
    toggleTrafficLayer(show?: boolean);
    toggleTransitLayer(show?: boolean);
    onClickMap(event: IEventClickMap): void;
    clearAllMap(): void;
    clearClusters(): void;
    clearMarkers(): void;
    clearRoutes(): void;
    clearPolygons(): void;

}
