import { AbstractConfig } from '../../abstract/abstract-config';
import { BaseMarker } from '../../entity/base-marker';
import { IPolygonOptions } from '../../interfaces/i-polygon';
import { ICircleOptions } from '../../interfaces/i-circle-options';
import { IRouteInfo } from '../../interfaces/i-route-info';
import { IPoint } from '../../interfaces/i-point';
import { GoogleMarkerOptions } from './entity/google-marker-options';
import { GoogleMarker } from './marker';
import { IPolylineOptions } from '../../interfaces/i-polyline-options';
import { Injectable } from '@angular/core';
import { AbstractMap } from '../../abstract/abstract-map';
import { IEventClikMap } from './interfaces/i-event-clik-map';
import * as markers from "../../../test.markers.json";
import { ILatLng } from '../../providers/google/interfaces/i-latlng';

declare var google;
let transitLayer;
let trafficLayer;

@Injectable()
export class GoogleConfig extends AbstractConfig {

    onClickMap(event: IEventClikMap) {

        if (event.placeId) {
            console.log('gETDETAILSPLACEID', event.placeId);
            event.stop();
        }
        else {
            console.log('gETADRESSLATLNG', event.latLng.lat(), event.latLng.lng());
        }
    }

    zoomIn(): void {

        let currentZoom = this.getZoom();
        this.map.api.setZoom(currentZoom + 1);
    }

    zoomOut(): void {

        let currentZoom = this.getZoom();
        this.map.api.setZoom(currentZoom - 1);
    }

    getAddress(coord: Position): IPoint[] {

        return null
    }

    getZoom(): number {

        return this.map.api.getZoom();
    }

    getBounds(): any {

        return this.map.api.getBounds();
    }

    setZoom(zoom: number): void {

        this.map.api.setZoom(zoom);
    }

    showMarker(point: IPoint) {

        let googleMarkerOptions: GoogleMarkerOptions = {
            draggable: true,
            clickable: true,
            visible: true,
            title: point.title,
            position: new google.maps.LatLng(point.position.latitude, point.position.latitude),
            icon: {
                title: 'picture',
                url: './assets/icons_map/icon_hotel.png'
            },
            zIndex: 1
        };
        let marker = new google.maps.Marker(googleMarkerOptions);
        this.map.api.setMap(marker)

        super.showMarker(marker);
    }

    drawMarkersOnMap(): void {

    }

    drawCircle(options: ICircleOptions): void {

        let circle = new google.maps.Circle(options);
        circle.setMap(this.map);
    }

    drawPolyline(options: IPolylineOptions): void {

        let polyline = new google.maps.Polyline();
        polyline.setMap(this.map);
    }

    drawPolygon(options: IPolygonOptions): void {

        let polygon = new google.maps.Polygon(options);
        polygon.setMap(this.map);
    }

    routeInfo(): IRouteInfo {

        throw new Error("Method not implemented.");
    }

    toggleTrafficJamLayer(show?: boolean): void {

        if (trafficLayer == null) {
            trafficLayer = new google.maps.TrafficLayer();
        }
        trafficLayer.setMap(show ? this.map.api : null);
    }

    toggleTransitLayer(show?: boolean): void {

        if (transitLayer == null) {
            transitLayer = new google.maps.TransitLayer();
        }
        transitLayer.setMap(show ? this.map.api : null);
    }

    polygonsContainsMarker(marker: BaseMarker, polygon: IPolygonOptions): boolean {

        return super.polygonsContainsMarker(marker, polygon);
    }
}