import { IConfig } from '../interfaces/i-config';
import { AbstractMarkerCluster } from './abstract-marker-cluster';
import { BaseMarker } from '../entity/base-marker';
import { IPoint } from '../interfaces/i-point';
import { ShapeType } from '../enum/e-shape-type';
import { IPolygonOptions } from '../interfaces/i-polygon';
import { AbstractRouteBuilder } from './abstract-route-builder';
import { IRouteInfo } from '../interfaces/i-route-info';
import { IPosition } from '../interfaces/i-position';
import { AbstractMap } from './abstract-map';
import { TravelMode } from '../enum/e-travel-mode';
import { TrafficMode } from '../enum/e-traffic-mode';
import { GeoContainer } from '../entity/geo-container';
import { ICircleOptions } from '../interfaces/i-circle-options';
import { IPolylineOptions } from '../interfaces/i-polyline-options';
import { Injectable } from "@angular/core";
import { IInitMap } from '../interfaces/i-init-map';
import * as mark from "../test.markers.json";
import { IEventClickMap } from '../providers/google/interfaces/i-event-clik-map';
import { IMapOptions } from '../interfaces/i-map-options';
import { Position } from '../entity/position';
import { Point } from '../entity/point';
import { IBaseMarkerOptions } from '../interfaces/i-base-marker-options';
import { ILatLngBounds } from '../providers/google/interfaces/i-latln-bounds';
import { ILatLng } from '../providers/google/interfaces/i-latlng';
import { MapToolbarComponent } from './../map-toolbar/map-toolbar.component';
import { Observable } from 'rxjs';
import { BaseCicle } from '../entity/base-circle';
import { BasePolygon } from '../entity/base-polygon';
import { BasePolyline } from '../entity/base-polyline';

declare var google;

@Injectable()
export abstract class AbstractConfig implements IConfig, IInitMap {

    map: AbstractMap;

    initMap(map: AbstractMap): void {

        this.map = map;
    }

    geo: GeoContainer;
    toolbar: MapToolbarComponent;
    marker: BaseMarker;
    markerCluster: AbstractMarkerCluster;
    radiusShape: ShapeType;
    routeBuilder: AbstractRouteBuilder;

    buildRoute(from: IPoint, to: IPoint, show?: boolean): void {

        if (show) {
            let routeOptions;
            let route = this.routeBuilder
                .setMap(this.map)
                .setOptions(routeOptions)
                .setStartPoint(from)
                .setFinishPoint(to)
                .build();

            route.showRoute();
        }
    }

    clearAllMap(): void {

        this.map.geo.clearAllMap();
    }


    clearMarkers(): void {

        this.map.geo.clearMarkers();
    }

    clearRoutes(): void {

        this.map.geo.clearRoutes();
    }

    clearPolygons(): void {

        this.map.geo.clearPolygons();
    }

    clearCircle(): void {

        this.map.geo.clearCircle();

    }

    drawMarkersOnMap(): void {

        try {
            if (this.map.loadMarkers) {

                this.clearAllMap()

                let markersVisible = false;

                if (this.getZoom() <= 3) {

                    this.clearAllMap();

                }
                if (this.getZoom() > 5) {

                    markersVisible = true;
                }

                if (markersVisible) {
                    for (let i = 0; i < mark.default.length; i++) {
                        let item = mark.default[i];

                        let marker = this.getBaseMarker(item);
                        marker.point = new Point();
                        marker.point.position = new Position();
                        marker.point.position.latitude = item.Address.Lat;
                        marker.point.position.longitude = item.Address.Lng;
                        marker.point.title = item.Hotelname;

                        this.boundsContainsMarker(marker);

                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    abstract getBounds(): ILatLngBounds;

    abstract getDetailsPoint(placeId: string): Observable<IPoint>;

    abstract drawCircle(cicle: BaseCicle): void;

    abstract drawPolyline(polyline: BasePolyline): void;

    abstract drawArea(polyline: BasePolyline, polygon: BasePolygon): void;

    abstract drawPolygon(polygon: BasePolygon): void;

    drawShapeOnMap(type: ShapeType): void {

        try {
            let path;

            let circleOptions: ICircleOptions = {
                strokeColor: "#1E90FF",
                strokeOpacity: 0.9,
                strokeWeight: 3.5,
                fillColor: "#1E90FF",
                fillOpacity: 0.35,
                center: {
                    latitude: 0.0,
                    longitude: 0.0
                },
                radius: 10000,
                draggable: true,
                editable: true
            };

            let circle = new BaseCicle(circleOptions);

            let polygonOptions: IPolygonOptions = {
                path: path,
                strokeColor: '#1E90FF',
                strokeOpacity: 0.9,
                strokeWeight: 3.5,
                fillColor: '#1E90FF',
                fillOpacity: 0.35,
            };

            let polygon = new BasePolygon(polygonOptions);

            let polylineOptions: IPolylineOptions = {
                clickable: false,
                strokeColor: '#1E90FF',
                strokeOpacity: 0.9,
                strokeWeight: 3.5,
                fillColor: '#1E90FF',
                fillOpacity: 0.35,
            };

            let polyline = new BasePolyline(polylineOptions);

            this.clearPolygons();

            switch (type) {
                case ShapeType.CIRCLE:
                    this.drawCircle(circle);
                    break;
                case ShapeType.AREA:
                    this.drawArea(polyline, polygon);
                    break;
                default:
                case ShapeType.STOP:
                    break;
            }

        }
        catch (error) {
            console.log(error);
        }

        this.map.loadMarkers = false;
    }

    abstract getAddress(position: ILatLng): IPoint[];

    abstract getZoom(): number;

    abstract getLatLngBounds(): ILatLngBounds;

    markersFitsBounds(): void {

        try {
            if (this.map.geo.markers != null && this.map.geo.markers.length > 0) {

                for (var i = 0; i < this.map.geo.markers.length; i++) {

                    this.boundsExtend(this.map.geo.markers[i], this.getLatLngBounds());
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    abstract onClickMap(event: IEventClickMap);

    abstract boundsContainsMarker(marker: BaseMarker): boolean;

    private getPointPosition(marker: BaseMarker): Position {

        return marker.point.position;
    }

    polygonsContainsMarker(marker: BaseMarker, polygon: IPolygonOptions): boolean {

        let positionmarker = this.getPointPosition(marker);

        let markerLatitude = positionmarker.latitude;
        let markerLongitude = positionmarker.longitude;

        let polygonPointsLatitude = polygon.path.map(val => {
            return val.position.latitude;
        });

        let polygonPointsLongitude = polygon.path.map(val => {
            return val.position.longitude;
        });

        let polygonPointsCount = polygon.path.length;
        let contains: boolean = false;

        /* 

        NOTE:
            i - current index of marker in array
            j - current index of polygon point in array

        */
        for (let i = 0, j = polygonPointsCount - 1; i < polygonPointsCount; j = i++) {
            if ((((polygonPointsLongitude[i] <= markerLongitude) && (markerLongitude < polygonPointsLongitude[j]))
                || ((polygonPointsLongitude[j] <= markerLongitude) && (markerLongitude < polygonPointsLongitude[i])))
                && (markerLatitude > (polygonPointsLatitude[j] - polygonPointsLatitude[i]) * (markerLongitude - polygonPointsLongitude[i])
                    / (polygonPointsLongitude[j] - polygonPointsLongitude[i]) + polygonPointsLatitude[i]))
                contains = !contains;
        }
        return contains;
    }

    radiusContainsMarker(marker: BaseMarker, position: IPosition): number {

        let circleCenterLatitude = position.latitude;
        let circleCenterLongitude = position.longitude;

        let positionmarker = this.getPointPosition(marker);

        let pointLatitude = positionmarker.latitude;
        let pointLongitude = positionmarker.longitude;

        let radiansCircleCenterLatitude = circleCenterLatitude * (Math.PI / 180);
        let radiansCircleCenterLongitude = circleCenterLongitude * (Math.PI / 180);
        let radiansPointLatitude = pointLatitude * (Math.PI / 180);
        let radiansPointLongitude = pointLongitude * (Math.PI / 180);

        const EARTH_RADIUS = 6372.795;

        let radiansDifferenceOfLongitudes = radiansPointLongitude - radiansCircleCenterLongitude;

        let arcTanganceOfTop = Math.sqrt(Math.pow(Math.cos(radiansPointLatitude) * Math.sin(radiansDifferenceOfLongitudes), 2) + Math.pow(Math.cos(radiansCircleCenterLatitude) * Math.sin(radiansPointLatitude) - Math.sin(radiansCircleCenterLatitude) * Math.cos(radiansPointLatitude) * Math.cos(radiansDifferenceOfLongitudes), 2));
        let arcTanganceOfBottom = Math.sin(circleCenterLatitude) * Math.sin(pointLatitude) + Math.cos(circleCenterLatitude) * Math.cos(pointLatitude) * Math.cos(radiansDifferenceOfLongitudes);
        let angle = Math.atan2(arcTanganceOfTop, arcTanganceOfBottom);
        let length = EARTH_RADIUS * angle;

        return length;
    }

    abstract routeInfo(): IRouteInfo;

    getBaseMarker(point: IPoint): BaseMarker {

        return new BaseMarker({
            title: point.title,
            icon: {
                url: './assets/icons_map/icon_hotel.png',
                title: ""
            },
            clickable: true,
            draggable: false,
            visible: true,
           
        });
    }

    abstract showMarker(point: IPoint): void

    abstract draggableMarker(enabled: boolean): void;

    abstract setZoom(zoom: number): void;

    abstract setMinZoom(zoom: number): void;

    abstract setMaxZoom(zoom: number): void;

    abstract setCenter(position: ILatLng): void;

    toggleMapDragging(enabled: boolean) {

        if (enabled) {
            this.map.options.allowScrolling = false;
            this.map.options.enableZoomByDoubleClick = true;
            this.map.options.draggable = false;
        }
        else {
            this.map.options.allowScrolling = true;
            this.map.options.enableZoomByDoubleClick = false;
            this.map.options.draggable = true;
        }
    }

    getMapOptions(): IMapOptions {

        return this.map.options;

    }

    abstract toggleTrafficLayer(show: boolean): void;

    abstract toggleTransitLayer(show: boolean): void;

    abstract zoomIn(): void;

    abstract zoomOut(): void;

    abstract boundsExtend(marker: BaseMarker, bounds: ILatLngBounds): void;
}