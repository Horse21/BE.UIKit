import { IMapOptions } from "../../interface/i-config";
import * as  ObjectMap  from "../class-objmap";
import { Injectable } from "@angular/core"
import * as mark from "../../test.markers.json";
import * as MarkerClusterer from 'bmaplib.markerclusterer';


export namespace Map.Baidu {
    declare var BMap: any;
    declare var BMapLib: any;
    //declare var MarkerClusterer: any;
    //var markerCluster: any;
    var markers: any[] = [];
    var radiusObject: any;
    var polygonArea: any[] = [];
    @Injectable()
    export class OptionsBaidu implements IMapOptions {

        constructor(private objMap: ObjectMap.Map.ObjectMap) {
        }

        showMarker(obj: any, markercluster: any) {
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

            console.log('setMarkers')
            if (typeof BMap !== "undefined") {
                let mcOptions = [{
                    url: './assets/icons_map/icon_pointgroup.png',
                    size: new BMap.Size(44, 44),
                    textColor: 'black',
                    offset: new BMap.Size(1.5, 1),
                }];
                // this.clearMap();
                let zoom = this.objMap.map.getZoom();
                var bounds = this.objMap.map.getBounds();
                let sending = false;
                if (zoom > 5) {
                    sending = true;

                }
                if (zoom == 3) {
                    // this.clearMap();
                }

                for (let i = 0; i < mark.default.length; i++) {
                    let item = mark.default[i];
                    var icon = new BMap.Icon('./assets/icons_map/icon_hotel.png', new BMap.Size(60, 60));
                    var marker = new BMap.Marker(new BMap.Point(item.Address.Lng, item.Address.Lat), {
                        icon: icon,
                        title: item.Hotelnam,
                    });
                    if (sending) {
                        if (bounds.containsPoint(marker.getPosition())) {
                            markers.push(marker);
                        }
                    }

                }
                let cluster = new MarkerClusterer(this.objMap.map);
                // let cluster =  new markerCluster(this.objMap, markers, mcOptions)
                //  markercluster.setStyles(mcOptions);
                cluster.addMarkers(markers);
                // markercluster.setGridSize(80);
                // markercluster.setMinClusterSize(2);
            }

        }
        clearMap() {
            try {
                markers.forEach((item) => {
                    item.setMap(null);
                });
                //if (markerCluster != null) {
                //   markerCluster.clearMarkers();
                //   console.log('markerCluster', markerCluster)

                //  }

                if (radiusObject != null) {
                    radiusObject.setMap(null);

                }
                if (polygonArea != null) {
                    polygonArea.forEach((item) => {
                        item.setMap(null);
                        item.getPath().clear();
                    });

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

        transitLayer(transit: any, boolean: boolean) {
            if (boolean) {
                transit.setMap(this.objMap.map);
            }
            else {
                transit.setMap(null);
            }
        }
        trafficLayer(traffic: any, boolean: boolean) {
            if (boolean) {
                traffic.setMap(this.objMap.map);
            }
            else {
                traffic.setMap(null);
            }
        }
        getAddress(coord: any) {

        }

        draggableMap(boolean: any) {
            if (boolean) {
                console.log('grable false')
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