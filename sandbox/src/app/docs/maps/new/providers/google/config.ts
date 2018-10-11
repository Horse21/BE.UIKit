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
import { ResponseStatus } from './enum/e-status-response ';
import { Position } from '../../entity/position';
import { ILatLngBounds } from './interfaces/i-latln-bounds';
import { Point } from '../../entity/point';
import { EventType } from '../../enum/e-event-type';
import { OptionType } from '../../enum/e-option';
import { Address } from '../../classes/address';
import { AddressType } from './enum/e-adress-type';
import { AddressTypeName } from './enum/e-address-type-name';
import { AddressSettings } from './classes/address-settings';


declare var google;
let transitLayer;
let trafficLayer;
let polygonsStorage: any[] = [];
let markersStorage: any[] = [];
let circleStorage = null;
let selectMarker = null;
let routeStorage = null;

@Injectable()
export class GoogleConfig extends AbstractConfig {

    markersFitsBounds(): void {

        super.markersFitsBounds();

    }

    boundsExtend(marker: BaseMarker, bounds: ILatLngBounds): void {

        let LatLng = new google.maps.LatLng({ lat: marker.point.position.latitude, lng: marker.point.position.longitude });

        bounds.extend(LatLng);

        this.map.api.fitBounds(bounds);

    }

    getLatLngBounds(): ILatLngBounds {

        return new google.maps.LatLngBounds();

    };

    boundsContainsMarker(marker: BaseMarker): boolean {

        let googleMarkerOptions: GoogleMarkerOptions = {
            draggable: false,
            clickable: true,
            visible: true,
            title: marker.point.title,
            position: new google.maps.LatLng(marker.point.position.latitude, marker.point.position.longitude),
            icon: {
                title: 'picture',
                url: './assets/icons_map/icon_hotel.png'
            },
            zIndex: 10,

        };

        let googlemarker = new google.maps.Marker(googleMarkerOptions);

        googlemarker["geoPoint"] = marker;

        google.maps.event.addListener(googlemarker, EventType.click, (event) => {

            selectMarker = googlemarker;

        });

        if (this.getBounds().contains(googlemarker.getPosition())) {

            this.map.geo.pushMarkers(googlemarker);

            markersStorage.push(googlemarker);

            this.map.cluster.addMarker(googlemarker, true);

        }

        return true;
    }

    clearAllMap(): void {

        this.clearPolygons();
        this.clearMarkers();
        this.clearCircle();
        super.clearAllMap();

    }


    clearMarkers(): void {

        if (this.map.cluster.googleCluster != null) {
            this.map.cluster.removeMarkers();
        }
        super.clearMarkers();

        super.clearMarkers();

        markersStorage.forEach((item) => {
            item.setMap(null);
        });
    }

    clearRoutes(): void {

        super.clearRoutes();

        if (routeStorage != null) {
            routeStorage = null;
        }

    }

    clearPolygons(): void {

        super.clearPolygons();

        polygonsStorage.forEach((item) => {
            item.setMap(null);
        });


    }


    clearCircle(): void {

        super.clearCircle();

        if (circleStorage != null) {
            circleStorage.setMap(null);
        }

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

    getAddress(coordinates: ILatLng): IPoint[] {

        let geocoder = new google.maps.Geocoder();

        let result = [];

        let componentAddress = this.getAddressSettings();

        geocoder.geocode({ 'latLng': coordinates },

            (results, status) => {
                if (status == ResponseStatus.OK) {

                    var place = results[0];

                    let point: Point = new Point();
                    point.position = new Position();
                    point.address = new Address();

                    for (let i = 0; i < place.address_components.length; i++) {

                        let addressType = place.address_components[i].types[0];

                        if (componentAddress[addressType]) {

                            let addressValue = place.address_components[i][componentAddress[addressType]];

                            if (addressType == 'country') {

                                point.address.country = addressValue;
                            }


                            if (addressType == 'locality' || addressType == 'postal_town') {

                                point.address.city = addressValue;
                            }

                            if (addressType == 'administrative_area_level_1' || addressType == 'administrative_area_level_2') {

                                point.address.district = addressValue;
                            }

                            if (addressType == 'route') {

                                point.address.street = addressValue;
                            }

                            if (addressType == 'street_number') {

                                point.address.house = addressValue;
                            }

                            if (addressType == 'postal_code') {

                                point.address.postCode = addressValue;
                            }
                        }

                    }

                    point.position.latitude = place.geometry.location.lat();
                    point.position.longitude = place.geometry.location.lng();
                    point.name = place.formatted_address;
                    point.googlePlaceId = place.place_id;
                    point.id = place.place_id;
                    point.subtype = place.types[0];
                    point.title = place.formatted_address;
                    point.type = 'internet'
                    point.source = 'google';
                    result.push(point)

                    this.showMarker(point);
                }
            });

        return result;
    }

    getDetailsPoint(placeId: string): IPoint[] {

        let placesService = new google.maps.places.PlacesService(this.map.api);

        let result = [];

        let componentAddress = this.getAddressSettings();

        placesService.getDetails({ placeId: placeId },

            (results, status) => {
                if (status == ResponseStatus.OK) {

                    let place = results;
                    let point: Point = new Point();
                    point.position = new Position();
                    point.address = new Address();

                    for (let i = 0; i < place.address_components.length; i++) {

                        let addressType = place.address_components[i].types[0];

                        if (componentAddress[addressType]) {

                            let addressValue = place.address_components[i][componentAddress[addressType]];


                            if (addressType == AddressType.country) {


                                point.address.country = addressValue;
                            }


                            if (addressType == AddressType.locality || addressType == AddressType.postal_town) {

                                point.address.city = addressValue;
                            }

                            if (addressType == AddressType.administrative_area_level_1 || addressType == AddressType.administrative_area_level_2) {

                                point.address.district = addressValue;
                            }

                            if (addressType == AddressType.route) {

                                point.address.street = addressValue;
                            }

                            if (addressType == AddressType.street_number) {

                                point.address.house = addressValue;
                            }

                            if (addressType == AddressType.postal_code) {

                                point.address.postCode = addressValue;
                            }
                        }


                    }

                    point.position.latitude = place.geometry.location.lat();
                    point.position.longitude = place.geometry.location.lng();

                    if (place.photos !== undefined) {
                        if ("photos" in place) {
                            if (place.photos.length > 0) {
                                point.photos = place.photos[0].getUrl({ 'maxWidth': 340, 'maxHeight': 340 });
                            }
                        }
                    }

                    point.name = place.formatted_address;
                    point.googlePlaceId = place.place_id;
                    point.id = place.place_id;
                    point.subtype = place.types[0];
                    point.type = 'internet'
                    point.source = 'google';


                    result.push(point)
                }
            });
        console.log(result, 'GETDETAILS')

        return result;

    }

    getZoom(): number {

        return this.map.api.getZoom();
    }

    getBounds(): ILatLngBounds {

        return this.map.api.getBounds();
    }

    private getAddressSettings(): AddressSettings {

        let AdressSettings = new AddressSettings();
        AdressSettings.country = AddressTypeName.long_name;
        AdressSettings.route = AddressTypeName.long_name;
        AdressSettings.locality = AddressTypeName.long_name;
        AdressSettings.postal_town = AddressTypeName.long_name;
        AdressSettings.administrative_area_level_1 = AddressTypeName.short_name;
        AdressSettings.sublocality_level_1 = AddressTypeName.long_name;
        AdressSettings.street_number = AddressTypeName.short_name;
        AdressSettings.postal_code = AddressTypeName.short_name;

        return AdressSettings;
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


        console.log(point)

        let googleMarkerOptions: GoogleMarkerOptions = {
            draggable: false,
            clickable: true,
            visible: true,
            title: point.title,
            position: new google.maps.LatLng(point.position.latitude, point.position.longitude),
            icon: {
                title: 'picture',
                url: './assets/icons_map/icon_hotel.png'
            },
            zIndex: 100,

        };

        let marker = new google.maps.Marker(googleMarkerOptions);

        google.maps.event.addListener(marker, EventType.click, (event) => {

            selectMarker = marker;

        });

        marker["geoPoint"] = point;

        markersStorage.push(marker);

        if (this.map.cluster.googleCluster != null) {
            this.map.cluster.addMarker(marker, true);
            this.map.cluster.refreshMarkers();
            this.map.geo.pushMarkers(marker)

        }

        this.markersFitsBounds();

    }

    drawMarkersOnMap(): void {

        super.drawMarkersOnMap();

    }

    draggableMarker(enabled: boolean): void {

        try {

            this.loadMarkers = false;

            selectMarker.setDraggable(enabled);

            if (enabled) {

                if (this.map.geo.circle != null) {

                    circleStorage.bindTo(OptionType.center, selectMarker, OptionType.position);
                }

            }

            google.maps.event.addListener(selectMarker, EventType.dragend, (event) => {

            });

        } catch (error) {

        }

    }

    drawCircle(options: ICircleOptions): void {

        if (circleStorage != null) {

            circleStorage.setMap(null);

            this.clearCircle();
        }

        let center = new google.maps.LatLng({ lat: selectMarker.position.lat(), lng: selectMarker.position.lng() });

        options.center = center;

        let circle = new google.maps.Circle(options);

        circle.setMap(this.map.api);

        google.maps.event.addListener(circle, EventType.radius_changed, () => {

        });

        google.maps.event.addListener(circle, EventType.dragend, () => {

        });

        this.map.geo.pushCircle(circle);

        circleStorage = circle;

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
        polygonsStorage = [];

        this.toggleMapDragging(true);

        google.maps.event.addDomListener(this.map.api.getDiv(), EventType.mousedown, () => {

            shaping = new google.maps.Polyline(optionsPolyline);

            shaping.setMap(this.map.api);

            polygonsStorage.push(shaping)

            let move = google.maps.event.addListener(this.map.api, EventType.mousemove, event => {

                shaping.getPath().push(event.latLng);

            });

            google.maps.event.addListenerOnce(this.map.api, EventType.mouseup, () => {

                google.maps.event.removeListener(move);

                let path = shaping.getPath();

                shaping.setMap(null);

                optionsPolygon.path = path;

                shaping = new google.maps.Polygon(optionsPolygon);

                shaping.setMap(this.map.api);

                this.toggleMapDragging(false);

                polygonsStorage.push(shaping);

                google.maps.event.clearListeners(this.map.api.getDiv(), EventType.mousedown);

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