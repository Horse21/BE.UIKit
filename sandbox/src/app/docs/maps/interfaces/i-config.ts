import { IPoint } from "./i-point";
import { ShapeType } from "../enum/e-shape-type";
import { BaseMarker } from "../entity/base-marker";
import { IRouteInfo } from "./i-route-info";
import { IPolygonOptions } from "./i-polygon";
import { IPosition } from "./i-position";
import { IEventClickMap } from "../providers/google/interfaces/i-event-clik-map";
import { ILatLngBounds } from "../providers/google/interfaces/i-latln-bounds";
import { ILatLng } from "../providers/google/interfaces/i-latlng";
import { Observable } from "rxjs";

export interface IConfig {

    buildRoute(from: IPoint, to: IPoint, show?: boolean): void;
    drawMarkersOnMap(): void;
    drawShapeOnMap(type: ShapeType): void;
    getAddress(position: ILatLng): Array<IPoint>;
    getDetailsPoint(placeId: string): Observable<IPoint>;
    getZoom(): number;
    getLatLngBounds(): ILatLngBounds;
    markersFitsBounds(): void;
    polygonsContainsMarker(marker: BaseMarker, polygon: IPolygonOptions): boolean;
    radiusContainsMarker(marker: BaseMarker, position: IPosition): number;
    boundsContainsMarker(marker: BaseMarker): boolean;
    boundsExtend(marker: BaseMarker, bounds: ILatLngBounds): void;
    routeInfo(): IRouteInfo;
    zoomIn(): void;
    zoomOut(): void;
    setZoom(zoomLevel: number);
    setMinZoom(zoom: number): void;
    setMaxZoom(zoom: number): void;
    setCenter(position: ILatLng): void;
    showMarker(point: IPoint): void;
    toggleMapDragging(enabled?: boolean);
    toggleTrafficLayer(show?: boolean);
    toggleTransitLayer(show?: boolean);
    onClickMap(event: IEventClickMap): void;
    clearAllMap(): void;
    clearMarkers(): void;
    clearRoutes(): void;
    clearPolygons(): void;

}
