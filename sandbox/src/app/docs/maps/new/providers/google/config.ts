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
import { Position } from '../../entity/position';
import { ILatLngBounds } from './interfaces/i-latln-bounds';
import { Point } from '../../entity/point';


declare var google;
let transitLayer;
let trafficLayer;
let markers: any[] = [];
let polygons: any[] = [];
let selectMarker = null;
let route = null;

@Injectable()
export class GoogleConfig extends AbstractConfig {

    markersFitsBounds(): void {

        super.markersFitsBounds();

    }

    boundsExtend(marker: BaseMarker, bounds: ILatLngBounds): void {

        let LatLng = new google.maps.LatLng({ lat: marker.point.latitude, lng: marker.point.longitude });

        bounds.extend(LatLng);

        this.map.api.fitBounds(bounds);

    }

    getLatLngBounds(): ILatLngBounds {

        return new google.maps.LatLngBounds();

    };

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

        googlemarker["geoPoint"] = marker;

        google.maps.event.addListener(googlemarker, 'click', (event) => {

            selectMarker = googlemarker;
            console.log('MarkerClick', event, googlemarker);

        });

        if (this.getBounds().contains(googlemarker.getPosition())) {

            this.map.geo.pushMarkers(googlemarker);

            markers.push(googlemarker);

            this.map.cluster.addMarker(googlemarker, true);

        }

        return true;
    }

    clearAllMap(): void {

        this.clearClusters();
        this.clearPolygons();
        this.clearMarkers();
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

        markers.forEach((item) => {
            item.setMap(null);
        });
    }

    clearRoutes(): void {

        super.clearRoutes();

        if (route != null) {
            route = null;
        }

    }

    clearPolygons(): void {

        super.clearPolygons();

        polygons.forEach((item) => {
            item.setMap(null);
        });


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
        return null;
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

        google.maps.event.addListener(marker, 'click', (event) => {

            selectMarker = marker;
            console.log('MarkerClick', event);

        });

        marker["geoPoint"] = point;
        markers.push(marker);

        if (this.map.cluster.googleCluster != null) {
            this.map.cluster.addMarker(marker, true);
            this.map.geo.pushMarkers(marker)

        }

        this.markersFitsBounds();

    }

    drawMarkersOnMap(): void {

        super.drawMarkersOnMap();

    }

    drawCircle(options: ICircleOptions): void {


console.log(selectMarker)

        let center = new google.maps.LatLng({ lat: selectMarker.position.lat(), lng: selectMarker.position.lng() });

        options.center = center;

        let circle = new google.maps.Circle(options);

        circle.setMap(this.map.api);

        google.maps.event.addListener(circle, 'radius_changed', () => {

        });

        google.maps.event.addListener(circle, 'dragend', () => {

        });

        this.map.geo.pushPolygons(circle);

        polygons.push(circle);

    }

    drawPolygon(options: IPolygonOptions): void {

        let polyline = new google.maps.Polyline();

        polyline.setMap(this.map.api);
    }


    drawPolyline(options: IPolylineOptions): void {

        let polyline = new google.maps.Polyline();

        polyline.setMap(this.map.api);
    }

    drawArea(optionsPolyline: IPolylineOptions, optionsPolygon: IPolygonOptions): void {

        let shaping: any;
        polygons = [];

        this.toggleMapDragging(true);

        google.maps.event.addDomListener(this.map.api.getDiv(), 'mousedown', () => {

            shaping = new google.maps.Polyline(optionsPolyline);

            shaping.setMap(this.map.api);

            polygons.push(shaping)

            let move = google.maps.event.addListener(this.map.api, 'mousemove', event => {

                shaping.getPath().push(event.latLng);

            });

            google.maps.event.addListenerOnce(this.map.api, 'mouseup', () => {

                google.maps.event.removeListener(move);

                let path = shaping.getPath();

                shaping.setMap(null);

                optionsPolygon.path = path;

                shaping = new google.maps.Polygon(optionsPolygon);

                shaping.setMap(this.map.api);

                this.toggleMapDragging(false);

                polygons.push(shaping);

                google.maps.event.clearListeners(this.map.api.getDiv(), 'mousedown');

                let array = shaping.getPath().getArray();
                let bounds = new google.maps.LatLngBounds();
                for (var n = 0; n < array.length; n++) {
                    bounds.extend(array[n]);
                }
                this.map.api.panToBounds(bounds);
                this.map.api.fitBounds(bounds);

            });
        });
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