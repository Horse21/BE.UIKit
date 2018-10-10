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
import { IMapOptions } from '../../../interface/i-config';
import { Position } from '../../entity/position';
import { ILatLngBounds } from './interfaces/i-latln-bounds';
import { Point } from '../../entity/point';
import { marker } from 'leaflet';

declare var google;
let transitLayer;
let trafficLayer;

@Injectable()
export class GoogleConfig extends AbstractConfig {

    markersFitsBounds(): void {

        var bounds = new google.maps.LatLngBounds();

        for (var i = 0; i < this.map.geo.markers.length; i++) {
          

        }
        if (this.map.geo.markers.length > 1) {         
                 
        }
        if (this.map.geo.markers.length == 1) {
           
        }
		
    }

    boundsExtend(bounds: ILatLngBounds): void {

        throw new Error("Method not implemented.");
    }

    boundsContainsMarker(marker: BaseMarker): boolean {

        let googleMarkerOptions: GoogleMarkerOptions = {
            draggable: true,
            clickable: true,
            visible: true,
            title: '',
            position: new google.maps.LatLng(marker.point.latitude, marker.point.longitude),
            icon: {
                title: 'picture',
                url: './assets/icons_map/icon_hotel.png'
            },
            zIndex: 10,

        };

        let googlemarker = new google.maps.Marker(googleMarkerOptions);

        if (this.getBounds().contains(googlemarker.getPosition())) {

            this.map.geo.pushMarkers(googlemarker);
            this.map.cluster.addMarker(googlemarker, true);

            this.markersFitsBounds();
            console.log(this.map,'THIS MAP')

        }

        return true;

    }


    clearAllMap(): void {

        this.clearClusters();
        super.clearAllMap();

    }

    clearClusters(): void {

        if (this.map.cluster.googleCluster != null) {
            this.map.cluster.removeMarkers();
        }
        super.clearClusters();
    }

    clearMarkers(): void {

        super.clearMarkers();
    }

    clearRoutes(): void {

        super.clearRoutes();
    }

    clearPolygons(): void {

        super.clearPolygons();
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

        let latLng = new google.maps.LatLng(coord.latitude, coord.longitude);
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latLng },
            (results, status) => {
                if (status == ResponseStatus.OK) {
                    console.log(results[0], status)
                }
            });
        return null
    }

    getDetailsPoint(placeId: string): IPoint[] {

        let placesService = new google.maps.places.PlacesService(this.map.api);

        placesService.getDetails({ placeId: placeId },
            (place, status) => {
                if (status == ResponseStatus.OK) {
                    console.log(place, status)
                }
            });
        return null;
    }

    getZoom(): number {

        return this.map.api.getZoom();
    }

    getBounds(): ILatLngBounds {

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


    toggleMapDragging(enabled: boolean) {

        let currentMapOptions = super.getMapOptions();

        if (enabled) {
            this.map.api.setOptions({
                draggable: currentMapOptions.draggable = false,
                scrollwheel: currentMapOptions.scrollwheel = false,
                disableDoubleClickZoom: currentMapOptions.disableDoubleClickZoom = false,
            });
        }
        else {
            this.map.api.setOptions({
                draggable: currentMapOptions.draggable = true,
                scrollwheel: currentMapOptions.scrollwheel = true,
                disableDoubleClickZoom: currentMapOptions.disableDoubleClickZoom = true,
            });
        }
    }


    showMarker(point: IPoint) {

        super.showMarker(point);

        let googleMarkerOptions: GoogleMarkerOptions = {
            draggable: true,
            clickable: true,
            visible: true,
            title: '',
            position: new google.maps.LatLng(point.position.latitude, point.position.longitude),
            icon: {
                title: 'picture',
                url: './assets/icons_map/icon_hotel.png'
            },
            zIndex: 100,

        };

        let marker = new google.maps.Marker(googleMarkerOptions);

        if (this.map.cluster.googleCluster != null) {
            this.map.cluster.addMarker(marker, true);
            this.map.geo.pushMarkers(marker)
        }

    }

    drawMarkersOnMap(): void {

        super.drawMarkersOnMap();

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

    toggleTrafficLayer(show: boolean): void {

        if (trafficLayer == null) {
            trafficLayer = new google.maps.TrafficLayer();
        }
        trafficLayer.setMap(show ? this.map.api : null);
    }

    toggleTransitLayer(show: boolean): void {

        if (transitLayer == null) {
            transitLayer = new google.maps.TransitLayer();
        }
        transitLayer.setMap(show ? this.map.api : null);
    }

    polygonsContainsMarker(marker: BaseMarker, polygon: IPolygonOptions): boolean {

        return super.polygonsContainsMarker(marker, polygon);
    }
}