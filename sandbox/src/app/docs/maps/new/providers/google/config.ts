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
import { IEventClickMap } from './interfaces/i-event-clik-map';
import * as mark from "../../../test.markers.json";
import { ILatLng } from '../../providers/google/interfaces/i-latlng';
import { ResponseStatus } from './enum/e-status-response ';
import { Position } from '../../entity/position';
import { ILatLngBounds } from './interfaces/i-latln-bounds';
import { Point } from '../../entity/point';
import { EventType } from '../../enum/e-event-type';
import { OptionType } from '../../enum/e-option';
import { Address } from '../../classes/address';
import { AddressType } from './enum/e-adress-type';
import { AddressTypeName } from './enum/e-address-type-name';
import { AddressSettings } from "./classes/address-settings";
import { PointAddress } from './enum/e-point-address';
import { Observable, Observer } from 'rxjs';
import { AddressComponent } from './classes/address-component';

declare var google;
let transitLayer;
let trafficLayer;
let polygonsStorage: any[] = [];
let circleStorage = null;


@Injectable()
export class GoogleConfig extends AbstractConfig {

    markersFitsBounds(): void {

        let bounds = new google.maps.LatLngBounds();

        if (this.map.geo.markers != null && this.map.geo.markers.length > 0) {

            for (var i = 0; i < this.map.geo.markers.length; i++) {

                let item = this.map.geo.markers[i];

                let LatLng = new google.maps.LatLng({ lat: item.point.position.latitude, lng: item.point.position.longitude });

                bounds.extend(LatLng);
            }
        }

        this.map.api.fitBounds(bounds);

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

        let googleMarker = new google.maps.Marker(googleMarkerOptions);

        googleMarker["point"] = marker;

        google.maps.event.addListener(googleMarker, EventType.click, (event) => {

            this.map.selectedMarker = googleMarker;

        });



        if (this.getBounds().contains(googleMarker.getPosition())) {

            this.map.geo.pushMarkers(googleMarker);
            this.map.cluster.addMarker(googleMarker, true);

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
    }

    clearRoutes(): void {

        super.clearRoutes();

    }

    clearPolygons(): void {

        super.clearPolygons();
    }


    clearCircle(): void {

        super.clearCircle();

    }

    onClickMap(event: IEventClickMap) {

        if (this.map.clickMap) {

            this.map.loadMarkers = !this.map.clickMap;

            if (event.placeId) {
                event.stop();
                this.getDetailsPoint(event.placeId);
            }
            else {
                let latLng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());

                this.getAddress(latLng);
            }
        }
        console.log(this.map, 'THIS MAP')

    }

    zoomIn(): void {

        let currentZoom = this.getZoom();
        this.setZoom(currentZoom + 1);
    }

    zoomOut(): void {

        let currentZoom = this.getZoom();
        this.setZoom(currentZoom - 1);
    }

    private getDetailedAddress(place: Array<any>): any {

        let componentAddress = this.getAddressSettings();
        let pointAddress = [];
        let resultAddress = [];

        for (let i = 0; i < place.length; i++) {

            let parseaddress = new AddressComponent();
            let addresstype = new PointAddress();
            let addressType = place[i].types[0];
            if (componentAddress[addressType]) {

                let addressValue = place[i][componentAddress[addressType]];
                addresstype.type = addressType;
                addresstype.value = addressValue;
                pointAddress.push(addresstype);

                if (addressType == AddressType.country) {

                    parseaddress.typeName = 'country';
                    parseaddress.value = addressValue;
                    resultAddress.push(parseaddress)
                }
                if (addressType == AddressType.locality || addressType == AddressType.postal_town) {

                    parseaddress.typeName = 'city';
                    parseaddress.value = addressValue;
                    resultAddress.push(parseaddress)
                }

                if (addressType == AddressType.street_number) {

                    parseaddress.typeName = 'house';
                    parseaddress.value = addressValue;
                    resultAddress.push(parseaddress)
                }

                if (addressType == AddressType.administrative_area_level_1 || addressType == AddressType.administrative_area_level_2) {

                    parseaddress.typeName = 'district';
                    parseaddress.value = addressValue;
                    resultAddress.push(parseaddress)
                }

                if (addressType == AddressType.route) {
                    parseaddress.typeName = 'street';
                    parseaddress.value = addressValue;
                    resultAddress.push(parseaddress)
                }

                if (addressType == AddressType.postal_code) {
                    parseaddress.typeName = 'postCode';
                    parseaddress.value = addressValue;
                    resultAddress.push(parseaddress)
                }
            }
        }
        // console.log(pointAddress, 'addresstype')

        return resultAddress
    }


    getAddress(coordinates: ILatLng): IPoint[] {

        let geocoder = new google.maps.Geocoder();

        let result = [];

        let componentAddress = this.getAddressSettings();

        let point: Point = new Point();
        point.position = new Position();
        point.address = new Address();

        geocoder.geocode({ 'latLng': coordinates },

            (results, status) => {
                if (status == ResponseStatus.OK) {

                    var place = results[0];

                    for (let i = 0; i < place.address_components.length; i++) {

                    }

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

                    point.address.description = place.formatted_address;
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
        return null;
    }


    getDetailsPoint(placeId: string): Observable<IPoint> {

        return new Observable((observer: Observer<IPoint>) => {

            let placesService = new google.maps.places.PlacesService(this.map.api);
            let componentAddress = this.getAddressSettings();

            placesService.getDetails({ placeId: placeId },

                (result, status) => {

                    if (status == ResponseStatus.OK) {
                        if (result) {
                            let point: Point = new Point();
                            point.position = new Position();
                            point.address = new Address();

                            let place = result;

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
                            observer.next(point);

                        }
                    }

                });

        });
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

    setCenter(position: ILatLng): void {

        this.map.api.setCenter(position)

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

        try {
            super.showMarker(point);


            console.log(point)


            let position = new google.maps.LatLng(point.position.latitude, point.position.longitude);

            let googleMarkerOptions: GoogleMarkerOptions = {
                draggable: false,
                clickable: true,
                visible: true,
                title: point.name,
                position: position,
                icon: {
                    title: point.name,
                    url: './assets/icons_map/icon_flag.png'
                },
                zIndex: 1,

            };

            let marker = new google.maps.Marker(googleMarkerOptions);

            google.maps.event.addListener(marker, EventType.click, (event) => {
                console.log(this.map.selectedMarker, 'selectPoint')

            });

            this.map.selectedMarker = marker;



            marker["point"] = point;

            if (this.map.cluster.googleCluster != null) {
                this.map.geo.pushMarkers(marker)
                this.map.cluster.addMarker(marker, true);
                this.map.cluster.refreshMarkers();
            }

            this.markersFitsBounds();

        } catch (error) {

            console.log(error);

        }

    }

    drawMarkersOnMap(): void {

        super.drawMarkersOnMap();

    }

    draggableMarker(enabled: boolean): void {

        try {

            this.map.loadMarkers = !enabled;
            this.map.selectedMarker.setDraggable(enabled);

            if (enabled) {

                if (this.map.geo.circle != null) {

                    circleStorage.bindTo(OptionType.center, this.map.selectedMarker, OptionType.position);
                }

            }

            google.maps.event.addListener(this.map.selectedMarker, EventType.dragend, (event) => {

            });

        } catch (error) {

        }

    }

    drawCircle(options: ICircleOptions): void {

        if (circleStorage != null) {

            circleStorage.setMap(null);

            this.clearCircle();
        }

        let center = new google.maps.LatLng({ lat: this.map.selectedMarker.point.position.latitude, lng: this.map.selectedMarker.point.position.longitude });

        options.center = center;

        let circle = new google.maps.Circle(options);

        circle.setMap(this.map.api);

        google.maps.event.addListener(circle, EventType.radius_changed, () => {

            console.log(circle, 'radius_changed')

        });

        google.maps.event.addListener(circle, EventType.dragend, () => {

            console.log(circle, 'dragend')

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