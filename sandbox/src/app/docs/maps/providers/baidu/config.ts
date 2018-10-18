import { AbstractConfig } from '../../abstract/abstract-config';
import { BaseMarker } from '../../entity/base-marker';
import { IRouteInfo } from '../../interfaces/i-route-info';
import { IPoint } from '../../interfaces/i-point';
import { Injectable } from '@angular/core';
import { IEventClickMap } from './interfaces/i-event-clik-map';
import { ILatLng } from '../../providers/google/interfaces/i-latlng';
import { ILatLngBounds } from './interfaces/i-latln-bounds';
import { Observable } from 'rxjs';
import { BasePolygon } from '../../entity/base-polygon';
import { BasePolyline } from '../../entity/base-polyline';
import { BaseCicle } from '../../entity/base-circle';



@Injectable()
export class BaiduConfig extends AbstractConfig {
    getBounds(): ILatLngBounds {
        throw new Error("Method not implemented.");
    }
    getDetailsPoint(placeId: string): Observable<IPoint> {
        throw new Error("Method not implemented.");
    }
    drawCircle(cicle: BaseCicle): void {
        throw new Error("Method not implemented.");
    }
    drawPolyline(polyline: BasePolyline): void {
        throw new Error("Method not implemented.");
    }
    drawArea(polyline: BasePolyline, polygon: BasePolygon): void {
        throw new Error("Method not implemented.");
    }
    drawPolygon(polygon: BasePolygon): void {
        throw new Error("Method not implemented.");
    }
    getAddress(position: ILatLng): IPoint[] {
        throw new Error("Method not implemented.");
    }
    getZoom(): number {
        throw new Error("Method not implemented.");
    }
    getLatLngBounds(): ILatLngBounds {
        throw new Error("Method not implemented.");
    }
    onClickMap(event: IEventClickMap) {
        throw new Error("Method not implemented.");
    }
    boundsContainsMarker(marker: BaseMarker): boolean {
        throw new Error("Method not implemented.");
    }
    routeInfo(): IRouteInfo {
        throw new Error("Method not implemented.");
    }
    showMarker(point: IPoint): void {
        throw new Error("Method not implemented.");
    }
    draggableMarker(enabled: boolean): void {
        throw new Error("Method not implemented.");
    }
    setZoom(zoom: number): void {
        throw new Error("Method not implemented.");
    }
    setMinZoom(zoom: number): void {
        throw new Error("Method not implemented.");
    }
    setMaxZoom(zoom: number): void {
        throw new Error("Method not implemented.");
    }
    setCenter(position: ILatLng): void {
        throw new Error("Method not implemented.");
    }
    toggleTrafficLayer(show: boolean): void {
        throw new Error("Method not implemented.");
    }
    toggleTransitLayer(show: boolean): void {
        throw new Error("Method not implemented.");
    }
    zoomIn(): void {
        throw new Error("Method not implemented.");
    }
    zoomOut(): void {
        throw new Error("Method not implemented.");
    }
    boundsExtend(marker: BaseMarker, bounds: ILatLngBounds): void {
        throw new Error("Method not implemented.");
    }


}