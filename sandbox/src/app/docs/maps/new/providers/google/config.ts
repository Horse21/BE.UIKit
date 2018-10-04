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
import { IEventClickMap } from './interfaces/i-event-clik-map';
import * as mark from "../../../test.markers.json";
import { ILatLng } from '../../providers/google/interfaces/i-latlng';
import { IPosition } from '../../interfaces/i-position';
import { ResponseStatus } from './enum/i-status-response ';

declare var google;
let transitLayer;
let trafficLayer;

@Injectable()
export class GoogleConfig extends AbstractConfig {

    getDetailsPoint(placeId: string): IPoint[] {
        let placesService = new google.maps.places.PlacesService(this.map.api);

        placesService.getDetails({ placeId: placeId }, function (place, status) {

            if (status == ResponseStatus.OK) {
                console.log(place, status)
            }
        });
        return null;
    }

    onClickMap(event: IEventClickMap) {

        if (event.placeId) {
            event.stop();
            this.getDetailsPoint(event.placeId);
        }
        else {
            let latLng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
            this.getAddress(latLng);
        }
    }

    zoomIn(): void {

        let currentZoom = this.getZoom();
        this.setZoom(currentZoom + 1);
    }

    zoomOut(): void {

        let currentZoom = this.getZoom();
        this.setZoom(currentZoom - 1);
    }

    getAddress(coord: Position): IPoint[] {

        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': coord },
            function (results, status) {
                if (status == ResponseStatus.OK) {
                    console.log(results[0], status)
                }
            });
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

    setMinZoom(zoom: number): void {

        this.map.api.setOptions({ minZoom: zoom });
    }

    setMaxZoom(zoom: number): void {

        this.map.api.setOptions({ maxZoom: zoom });
    }

    setCenter(position: IPosition): void {
        
        this.map.api.setCenter({ lat: position.latitude, lng: position.longitude });
    }

    showMarker(point: IPoint) {

        let googleMarkerOptions: GoogleMarkerOptions = {
            draggable: true,
            clickable: true,
            visible: true,
            title: point.title,
            position: new google.maps.LatLng(point.position.latitude, point.position.longitude),
            icon: {
                title: 'picture',
                url: './assets/icons_map/icon_hotel.png'
            },
            zIndex: 1,

        };
        let marker = new google.maps.Marker(googleMarkerOptions);
        super.showMarker(marker)
    }

    drawMarkersOnMap(): void {
        let pl: IPoint = new IPoint();

        for (let i = 0; i < mark.default.length; i++) {
            let item = mark.default[i];
            let point: IPoint = new IPoint();
            point.position = new IPosition();
            point.position.longitude = item.Address.Lng;
            point.position.latitude = item.Address.Lat;

            item["point"] = point
            this.showMarker(point);

        }
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