import { IMapOptions } from "../../interface/i-config";
import * as  ObjectMap from "../class-objmap";
import { Injectable } from "@angular/core";
import * as mark from "../../test.markers.json";

export namespace Map.Yandex {
    declare var ymaps: any;
    let markerCluster: any;
    let markers: any[] = [];
    let radiusObject: any;
    let polygonArea: any[] = [];
    @Injectable()
    export class OptionsYandex implements IMapOptions {

        constructor(private objMap: ObjectMap.Map.ObjectMap) {
        }

        showMarker(obj: any) {
            try {

            }
            catch (error) {
                console.log(error);
            }
        }

        setZoomLevel(type: string) {
            try {
                let currentZoom = this.objMap.map.getZoom();
                if (type === 'plus') {
                    this.objMap.map.setZoom(currentZoom + 1);
                }
                else {
                    this.objMap.map.setZoom(currentZoom - 1);
                }
            }
            catch (error) {
                console.log(error);
            }
        }

        drawingShapesMap(type: any) {
            try {

            }
            catch (error) {
                console.log(error);
            }
        }

        inclusionMarkersPolygon(item: any, xp: any[], yp: any[]): boolean {
            let x = item.position.lat();
            let y = item.position.lng();
            let npol = xp.length;
            let j: any = npol - 1;
            let c: boolean = false;
            for (let i = 0; i < npol; i++) {
                if ((((yp[i] <= y) && (y < yp[j])) || ((yp[j] <= y) && (y < yp[i]))) &&
                    (x > (xp[j] - xp[i]) * (y - yp[i]) / (yp[j] - yp[i]) + xp[i])) {
                    c = !c
                }
                j = i;
            }
            return c;
        }
        inclusionMarkersRadius(Lat1: number, Lng1: number, Lat2: number, Lng2: number) {

        }

        setZoomMin(zoom: number) {

        }
        setZoomMax(zoom: number) {

        }
        setMarkers = () => {
            try {
                this.clearMap();
                let zoom = this.objMap.map.getZoom();
                let sending = false;
                if (zoom > 5) {
                    sending = true;

                }
                if (zoom < 3) {
                    this.clearMap();
                }
                if (sending) {
                    for (let i = 0; i < mark.default.length; i++) {
                        let item = mark.default[i];
                        let marker = new ymaps.GeoObject({
                            geometry: {
                                type: "Point",
                                coordinates: [item.Address.Lat, item.Address.Lng],
                            },
                            properties: {
                                hintContent: item.Hotelname
                            }
                        }, {
                                iconLayout: 'default#image',
                                iconImageSize: [52, 56],
                                iconImageHref: './assets/icons_map/icon_hotel.png',
                                hintContent: item.Hotelname
                            })
                        marker["point"] = item;
                        if (ymaps.util.bounds.containsPoint(this.objMap.map.getBounds(), marker.geometry.getCoordinates())) {
                            markers.push(marker);
                        }
                    }
                }

                markerCluster = new ymaps.Clusterer({
                    clusterIcons: [{
                        href: './assets/icons_map/icon_pointgroup.png',
                        size: [53, 52],
                        offset: [-20, -20]
                    }],
                }),

                    markerCluster.options.set({
                        gridSize: 140,
                        clusterDisableClickZoom: false,
                        minClusterSize: 3,
                        groupByCoordinates: false,
                        hasBalloon: false,
                    });

                markerCluster.add(markers);
                this.objMap.map.geoObjects.add(markerCluster);
            }
            catch (error) {
                console.log(error);
            }
        }
        clearMap() {
            try {
                this.objMap.map.geoObjects.removeAll();
                markers = [];
            }
            catch (error) {
                console.log(error);
            }

        }
        resizeMap() {
            console.log('resizeMap')
        }
        routeMap(start: any, end: any, show: boolean) {

        }
        fitBounds() {

        }
        setCenterMap() {

        }
        getBounds() {

        }
        resetMap() {

        }

        getZoom(): number {
            return this.objMap.map.getZoom();
        }

        setZoom(zoom: number) {
            this.objMap.map.setZoom(zoom);
        }

        transitLayer(show: boolean) {

        }
        trafficLayer(show: boolean) {

        }
        getAddress(coord: any) {

        }

        draggableMap(enabled: boolean) {
            if (enabled) {
                this.objMap.map.setOptions({
                    draggable: false,
                    scrollwheel: false,
                    disableDoubleClickZoom: false
                });
            }
            else {
                this.objMap.map.setOptions({
                    draggable: true,
                    scrollwheel: true,
                    disableDoubleClickZoom: true
                });
            }
        }
    }
}