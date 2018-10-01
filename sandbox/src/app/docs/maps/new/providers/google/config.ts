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
declare var google;
@Injectable()
export class GoogleConfig extends AbstractConfig {
    
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
        throw new Error("Method not implemented.");
    }

    toggleTransitLayer(show?: boolean): void {
        throw new Error("Method not implemented.");
    }

    polygonsContainsMarker(marker: BaseMarker, polygon: IPolygonOptions): boolean {
        return super.polygonsContainsMarker(marker, polygon);
    }

}