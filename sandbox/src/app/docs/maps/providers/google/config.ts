import { AbstractConfig } from '../../abstract/abstract-config';
import { BaseMarker } from '../../entity/base-marker';
import { IPolygonOptions } from '../../interfaces/i-polygon';
import { IRouteInfo } from '../../interfaces/i-route-info';
import { IPoint } from '../../interfaces/i-point';
import { GoogleMarkerOptions } from './entity/google-marker-options';
import { Injectable } from '@angular/core';
import { IEventClickMap } from './interfaces/i-event-clik-map';
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
import { PointAddress } from './classes/point-address';
import { Observable, Observer } from 'rxjs';
import { AddressComponent } from './classes/address-component';
import { PointAddressType } from './enum/e-point-address-type'
import { GoogleAddressType } from './classes/google-address-type';
import { BaseCicle } from '../../entity/base-circle';
import { BasePolyline } from '../../entity/base-polyline';
import { BasePolygon } from '../../entity/base-polygon';
import { AdditionalInformation } from '../../entity/point-additional-information';
import { TypeRoute } from '../../enum/e-type-route';
import { EventsMapEmitter } from "../../entity/event-emitter";
import { IPosition } from '../../interfaces/i-position';
import { IAddress } from "../../interfaces/i-address";
import { BoundsMap } from './classes/bounds-map';

declare var google;

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


    boundsExtendPolygon(polygon: BasePolygon, bounds: ILatLngBounds): void {

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
                title: 'hotel',
                url: './assets/icons_map/icon_hotel.png'
            },
            zIndex: 10
        };

        let googleMarker = new google.maps.Marker(googleMarkerOptions);

        googleMarker["point"] = marker.point;

        google.maps.event.addListener(googleMarker, EventType.click, () => {
            this.map.selectedMarker = googleMarker;
        });

        if (this.getBounds().contains(googleMarker.getPosition())) {
            this.map.geo.pushMarkers(googleMarker);
            this.map.cluster.addMarker(googleMarker, true);
        }

        return true;
    }


    buildRoute(from: IPoint, to: IPoint, typeRoute: TypeRoute, show: boolean) {
        super.buildRoute(from, to, typeRoute, show);
    }

    clearAllMap(): void {

        this.clearPolygons();
        this.clearMarkers();
        this.clearCircle();
        this.clearRoutes();
        super.clearAllMap();
        this.map.selectedMarker = null;
    }

    clearMarkers(): void {
        if (this.map.cluster.googleCluster != null) {
            this.map.cluster.removeMarkers();
        }
        super.clearMarkers();
    }

    clearRoutes(): void {
        if (this.map.geo.routes != undefined && this.map.geo.routes[0] != null) {
            this.map.geo.routes.forEach((item) => {
                item.setMap(null);
            });
            super.clearRoutes();
        }
    }

    clearPolygons(): void {
        if (this.map.geo.polygons != undefined && this.map.geo.polygons[0] != null) {
            this.map.geo.polygons.forEach((item) => {
                item.setMap(null);
            });
            super.clearPolygons();
        }
    }


    clearCircle(): void {
        if (this.map.geo.circle != null) {
            this.map.geo.circle.setMap(null);
            super.clearCircle();
        }
    }

    onClickMap(event: IEventClickMap) {
        event.stop();
        if (this.map.clickMap) {
            this.map.loadMarkers = !this.map.clickMap;
            if (event.placeId) {
                this.map.callbackMap.emit('onclickMapPlaceId', event.placeId);
            }
            else {
                let LatLng = { latitude: event.latLng.lat(), longitude: event.latLng.lng() };
                this.map.callbackMap.emit('onclickMapGetAddress', LatLng);
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


    getLoadCountMarker(): number {
        return this.map.geo.markers.length;
    }


    private getDetailedAddress(place: Array<GoogleAddressType>): Array<PointAddress> {
        let componentAddress = this.getAddressSettings();
        let pointAddress = [];
        let resultAddress = [];

        for (let i = 0; i < place.length; i++) {

            let parseAddress = new AddressComponent();
            let nameType = new PointAddress();
            let addressType = place[i].types[0];

            if (componentAddress[addressType]) {

                let addressValue = place[i][componentAddress[addressType]];

                nameType.type = addressType;
                nameType.value = addressValue;
                pointAddress.push(nameType);

                switch (addressType) {
                    case AddressType.country:
                        parseAddress.type = PointAddressType.COUNTRY;
                        parseAddress.value = addressValue;
                        resultAddress.push(parseAddress);
                        break;
                    case AddressType.locality:
                    case AddressType.postalTown:
                        parseAddress.type = PointAddressType.CITY;
                        parseAddress.value = addressValue;
                        resultAddress.push(parseAddress);
                        break;
                    case AddressType.streetNumber:
                        parseAddress.type = PointAddressType.HOUSE;
                        parseAddress.value = addressValue;
                        resultAddress.push(parseAddress);
                        break;
                    case AddressType.administrativeAreaLevel1:
                    case AddressType.administrativeAreaLevel2:
                        parseAddress.type = PointAddressType.DISTRICT;
                        parseAddress.value = addressValue;
                        resultAddress.push(parseAddress);
                        break;
                    case AddressType.route:
                        parseAddress.type = PointAddressType.STREET;
                        parseAddress.value = addressValue;
                        resultAddress.push(parseAddress)
                        break;
                    case AddressType.postalCode:
                        parseAddress.type = PointAddressType.POSTCODE;
                        parseAddress.value = addressValue;
                        resultAddress.push(parseAddress)
                        break;
                }
            }
        }
        return resultAddress
    }

    getAddress(position: IPosition): void {

        let LatLng = new google.maps.LatLng({ lat: position.latitude, lng: position.longitude });

        let geocoder = new google.maps.Geocoder();
        let point: Point = new Point();
        point.position = new Position();
        point.address = new Address();

        geocoder.geocode({ 'latLng': LatLng },
            (response, status) => {
                if (status == ResponseStatus.OK) {
                    var place = response[0];
                    let typeAddress = this.getDetailedAddress(place.address_components);

                    for (let i = 0; i < typeAddress.length; i++) {
                        let item = typeAddress[i];

                        switch (item.type) {
                            case PointAddressType.COUNTRY:
                                point.address.country = item.value;
                                break;
                            case PointAddressType.CITY:
                                point.address.city = item.value;
                                break;
                            case PointAddressType.DISTRICT:
                                point.address.district = item.value;
                                break;
                            case PointAddressType.STREET:
                                point.address.street = item.value;
                                break;
                            case PointAddressType.HOUSE:
                                point.address.house = item.value;
                                break;
                            case PointAddressType.POSTCODE:
                                point.address.postCode = item.value;
                                break;
                        }
                    }

                    point.address.countryCode = point.address.country.substring(0, 2).toUpperCase();
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

                    this.map.callbackMap.emit('getAddressPoint', point);
                }

                this.map.callbackMap.emit('responseMap', status);
            });
    }

    getDetailsPoint(placeId: string): void {
        let placesService = new google.maps.places.PlacesService(this.map.api);

        placesService.getDetails({ placeId: placeId },
            (response, status) => {
                if (status == ResponseStatus.OK) {
                    if (response) {
                        let point: Point = new Point();
                        point.address = new Address();
                        point.additionalInformation = new AdditionalInformation();

                        let place = response;
                        let typeAddres = this.getDetailedAddress(place.address_components);

                        for (let i = 0; i < typeAddres.length; i++) {
                            let item = typeAddres[i];

                            switch (item.type) {
                                case PointAddressType.COUNTRY:
                                    point.address.country = item.value;
                                    break;
                                case PointAddressType.CITY:
                                    point.address.city = item.value;
                                    break;
                                case PointAddressType.DISTRICT:
                                    point.address.district = item.value;
                                    break;
                                case PointAddressType.STREET:
                                    point.address.street = item.value;
                                    break;
                                case PointAddressType.HOUSE:
                                    point.address.house = item.value;
                                    break;
                                case PointAddressType.POSTCODE:
                                    point.address.postCode = item.value;
                                    break;
                            }
                        }

                        point.address.description = place.formatted_address;
                        point.address.countryCode = point.address.country.substring(0, 2).toUpperCase();

                        point.position = {
                            latitude: place.geometry.location.lat(),
                            longitude: place.geometry.location.lng()
                        }

                        if (this.placeHasPhoto(place)) {
                            point.photos = place.photos[0].getUrl({ 'maxWidth': 340, 'maxHeight': 340 });
                        }


                        point.name = place.name;
                        point.additionalInformation = {
                            webSite: place.website,
                            rating: place.rating,
                            phone: place.international_phone_number
                        };
                        point.googlePlaceId = place.place_id;
                        point.id = place.id;
                        point.subtype = place.types[0];
                        point.type = 'internet'
                        point.source = 'google';

                        this.map.callbackMap.emit('getDetailsPoint', point);

                    }
                }

                this.map.callbackMap.emit('responseMap', status);
            });
    }

    getZoom(): number {

        return this.map.api.getZoom();
    }

    getBounds(): ILatLngBounds {

        return this.map.api.getBounds();
    }

    getCenter(): ILatLng {

        return this.map.api.getCenter();
    }

    private getAddressSettings(): AddressSettings {

        let AdressSettings = new AddressSettings();

        AdressSettings.country = AddressTypeName.longName;
        AdressSettings.route = AddressTypeName.longName;
        AdressSettings.locality = AddressTypeName.longName;
        AdressSettings.postal_town = AddressTypeName.longName;
        AdressSettings.administrative_area_level_1 = AddressTypeName.shortName;
        AdressSettings.sublocality_level_1 = AddressTypeName.longName;
        AdressSettings.street_number = AddressTypeName.shortName;
        AdressSettings.postal_code = AddressTypeName.shortName;
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

    showMarker(point: IPoint, onSelectedpoint?: boolean) {

        try {

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

            google.maps.event.addListener(marker, EventType.click, () => {
                let position = new Position();
                position.latitude = this.map.selectedMarker.getPosition().lat();
                position.longitude = this.map.selectedMarker.getPosition().lng();
                this.map.callbackMap.emit('markerClick', position);
            });


            if (onSelectedpoint) {
                this.map.selectedMarker = marker;
            }

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

    setDraggableMarker(enabled: boolean): void {
        try {
            this.map.loadMarkers = !enabled;
            if (this.map.selectedMarker != null) {
                this.map.callbackMap.emit('markerDraggable', '', enabled);
                this.map.selectedMarker.setDraggable(enabled);
            }

            google.maps.event.addListener(this.map.selectedMarker, EventType.dragEnd, () => {

                let position = new Position();
                position.latitude = this.map.selectedMarker.getPosition().lat();
                position.longitude = this.map.selectedMarker.getPosition().lng();

                this.map.callbackMap.emit('markerDraggableEnd', position);
            });

        } catch (error) {

        }
    }

    drawCircle(cicle: BaseCicle): void {

        if (this.map.geo.circle != null) {

            this.clearCircle();
        }

        let center = new google.maps.LatLng({ lat: this.map.selectedMarker.point.position.latitude, lng: this.map.selectedMarker.point.position.longitude });

        cicle.options.center = center;

        let circle = new google.maps.Circle(cicle.options);

        let position = new Position();
        position.latitude = circle.getCenter().lat();
        position.longitude = circle.getCenter().lng();

        circle.setMap(this.map.api);
        this.map.callbackMap.emit('createRadius', position, circle.getRadius());

        this.map.geo.circle = circle;

        google.maps.event.addListener(circle, EventType.radiusChanged, () => {

            position.latitude = circle.getCenter().lat();
            position.longitude = circle.getCenter().lng();

            this.map.callbackMap.emit('radiusChanged', position, circle.getRadius());
        });

        google.maps.event.addListener(circle, EventType.dragEnd, () => {

            position.latitude = circle.getCenter().lat();
            position.longitude = circle.getCenter().lng();

            this.map.callbackMap.emit('radiusDragEnd', position, circle.getRadius());

            this.setDraggable(false)
        });

    }

    setEditable(enabled: boolean) {
        this.map.geo.circle.setEditable(enabled);
    }

    setCircleRadius(radius: number) {
        this.map.geo.circle.setRadius(radius);
    }

    setDraggable(enabled: boolean) {
        this.map.geo.circle.setDraggable(enabled);
    }

    setBindCicleToMarker(enabled: boolean) {
        if (this.map.geo.circle != null) {
            this.map.geo.circle.bindTo(OptionType.center, this.map.selectedMarker, OptionType.position);
        }
    }

    drawPolygon(polyline: BasePolygon): void {
        polyline = new google.maps.Polyline(polyline.options);
        polyline.setMap(this.map.api);
    }


    drawPolyline(polygon: BasePolyline): void {

        let polyline = new google.maps.Polyline(polygon.options);

        polyline.setMap(this.map.api);
    }

    drawArea(polyline: BasePolyline, polygon: BasePolygon): void {

        let drawShaping: any;

        this.toggleMapDragging(true);

        google.maps.event.addDomListener(this.map.api.getDiv(), EventType.mouseDown, () => {

            drawShaping = new google.maps.Polyline(polyline.options);

            drawShaping.setMap(this.map.api);

            this.map.geo.pushPolygons(drawShaping)

            let move = google.maps.event.addListener(this.map.api, EventType.mouseMove, event => {

                drawShaping.getPath().push(event.latLng);

            });

            google.maps.event.addListenerOnce(this.map.api, EventType.mouseUp, () => {

                google.maps.event.removeListener(move);

                let path = drawShaping.getPath();

                drawShaping.setMap(null);

                polygon.options.path = path;

                drawShaping = new google.maps.Polygon(polygon.options);

                drawShaping.setMap(this.map.api);

                this.toggleMapDragging(false);

                this.map.geo.pushPolygons(drawShaping)

                google.maps.event.clearListeners(this.map.api.getDiv(), EventType.mouseDown);

                let array = drawShaping.getPath().getArray();

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

        return this.map.route.routeInfo;
    }

    toggleTrafficLayer(show: boolean): void {

        if (this.map.trafficLayer == null) {

            this.map.trafficLayer = new google.maps.TrafficLayer();

        }

        this.map.trafficLayer.setMap(show ? this.map.api : null);
    }

    toggleTransitLayer(show: boolean): void {

        if (this.map.transitLayer == null) {

            this.map.transitLayer = new google.maps.TransitLayer();
        }

        this.map.transitLayer.setMap(show ? this.map.api : null);
    }

    polygonsContainsMarker(marker: BaseMarker, polygon: IPolygonOptions): boolean {

        return super.polygonsContainsMarker(marker, polygon);
    }

    panTo(latLng: ILatLng): void {

        this.map.api.panTo(latLng);
    }

    ResizeMap(onCenter: boolean) {
        try {
            if (onCenter) {
                google.maps.event.trigger(this.map.api, EventType.resize);
                this.setZoom(10);
                this.panTo(this.getCenter());
            }
            else {
                google.maps.event.trigger(this.map.api, EventType.resize);
                this.setZoom(this.getZoom());
            }

        } catch (error) {

        }
    }

    private placeHasPhoto(place): boolean {
        return place.photos !== undefined && "photos" in place && place.photos.length > 0
    }

    onEventIdle() {
        this.changedBoundsMap();
    }

    private changedBoundsMap(): void {

        let bounds = this.getBounds();
        if (bounds) {
            let SW = bounds.getSouthWest();
            let NE = bounds.getNorthEast();
            let currentBounds = new BoundsMap();
            currentBounds.ne = new Position();
            currentBounds.sw = new Position();
            currentBounds.ne.latitude = NE.lat();
            currentBounds.ne.longitude = NE.lng();
            currentBounds.sw.latitude = SW.lat();
            currentBounds.sw.longitude = NE.lng();

            this.map.callbackMap.emit('changedBoundsMap', currentBounds);

            this.drawMarkersOnMap();
        }
    }
}