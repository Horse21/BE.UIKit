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
declare var google;
let transitLayer;
let trafficLayer;
@Injectable()
export class GoogleConfig extends AbstractConfig {

    onClickMap(event: IEventClikMap) {

        if (event.placeId) {
            console.log('GETDETAILSPLACEID',event.placeId)
            event.stop();
        }
        else {
            console.log('GETADRESSLATLNG', event.latLng.lat(),event.latLng.lng())
        }
    }
    showMarker(point: IPoint) {

        let googleMarkerOptions: GoogleMarkerOptions = {
            draggable: true,
            clickable: true,
            visible: true,
            title: point.title,
            icon: {
                title: 'picture',
                url: './marker-icon.png'
            },
            zIndex: 1
        };
        let marker = new google.maps.Marker(googleMarkerOptions);
        super.showMarker(marker);
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