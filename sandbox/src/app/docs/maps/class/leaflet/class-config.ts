import { IMapOptions } from "../../interface/i-config";
import * as  ObjectMap from "../class-objmap";
import { Injectable } from "@angular/core";
import 'leaflet.markercluster';
export namespace Map.Leaflet {
    declare var L: any;
    let markerCluster: any;
    let markers: any[] = [];
    let radiusObject: any;
    let polygonArea: any[] = [];

    @Injectable()
    export class OptionsLeaflet implements IMapOptions {

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
            this.clearMap();
            let zoom = this.objMap.map.getZoom();
            let bounds = this.objMap.map.getBounds();
            let sending = false;
            if (zoom > 5) {
                sending = true;

            }
            if (zoom < 3) {
                this.clearMap();
            }
           
            markerCluster = L.markerClusterGroup({
                chunkedLoading: false,
                maxClusterRadius: 120,
                iconCreateFunction: function (cluster) {
                    var markers = cluster.getAllChildMarkers();
                    var html = '<div class="markerClusLeaftlet">' + markers.length + '</div>';
                    return L.divIcon({ html: html, className: 'mycluster', iconSize: L.point(44, 44) });
                },
            });
            markerCluster.addLayers(markers);
            this.objMap.map.addLayer(markerCluster);

        }
        clearMap() {
            try {
                for (var i = 0; i < markers.length; i++) {
                    this.objMap.map.removeLayer(markers[i]);
                    if (markerCluster != null) {
                        markerCluster.removeLayer(markers[i]);
                    }
                }
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