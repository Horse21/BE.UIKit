import { IMapOptions } from "../../interface/i-config";
import { ObjectMap } from "../class-objmap";
import { Injectable } from "@angular/core";

declare var google: any;
declare var require: any;
var markerCluster: any;
var markers: any[] = [];
var radiusObject: any;
var polygonArea: any[] = [];

@Injectable()
export class OptionsLeaflet implements IMapOptions {

    constructor(private objMap: ObjectMap) {
    }

    showMarker(obj: any, markercluster: any) {
        try {
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(obj.Address.Lat, obj.Address.Lng),
                draggable: false,
                visible: true,
                clickable: true,
                icon: { url: require('../../images/icon/icon_hotel.png') },
                title: obj.Hotelname
            });

            marker.setMap(this.objMap.map);
            markers.push(marker);
            if (markercluster !== null) {
                markercluster.addMarker(marker, true);
                markercluster.repaint();
            }
            markerCluster = markercluster;
        }
        catch (error) {
            console.log(error);
        }
    }

    setZoomLevel(type: string) {
        console.log("objMap.map", this.objMap.map);
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
            let drawingManager;
            var radius: number = 10000;
            if (drawingManager != null) {
                drawingManager.setMap(null);
            }
            if (radiusObject != null) {
                radiusObject.setMap(null);
            }

            if (polygonArea !== null) {
                polygonArea.forEach((item) => {
                    item.setMap(null);
                    item.getPath().clear();
                });

            }
            let option: any;
            if (type == 'stop') {
            }

            if (type === 'circle') {
                var center = new google.maps.LatLng({ lat: 55.755814, lng: 37.617635 });
                option = {
                    strokeColor: '#1E90FF',
                    strokeOpacity: 0.9,
                    strokeWeight: 3.5,
                    fillColor: '#1E90FF',
                    fillOpacity: 0.35,
                    center: center,
                    radius: radius,
                    draggable: true,
                    editable: true,
                }
                radiusObject = new google.maps.Circle(option);
                radiusObject.setMap(this.objMap.map);
                google.maps.event.addListener(radiusObject, 'radius_changed', function () {
                    console.log('radius CHANGE')
                });

                google.maps.event.addListener(radiusObject, 'dragend', function () {
                    console.log('dragend')

                });
            }

            if (type == 'area') {
                let map: any = this.objMap.map;
                let poly: any;
                this.draggableMap(true);
                google.maps.event.addDomListener(map.getDiv(), 'mousedown', () => {
                    poly = new google.maps.Polyline({
                        map: map,
                        clickable: false, strokeColor: '#1E90FF',
                        strokeOpacity: 0.9,
                        strokeWeight: 3.5,
                        fillColor: '#1E90FF',
                        fillOpacity: 0.35,
                    });

                    polygonArea.push(poly)
                    var move = google.maps.event.addListener(map, 'mousemove', e => {
                        poly.getPath().push(e.latLng);

                    });
                    google.maps.event.addListenerOnce(map, 'mouseup', () => {
                        google.maps.event.removeListener(move);
                        var path = poly.getPath();
                        poly.setMap(null);
                        poly = new google.maps.Polygon({
                            map: map,
                            path: path, strokeColor: '#1E90FF',
                            strokeOpacity: 0.9,
                            strokeWeight: 3.5,
                            fillColor: '#1E90FF',
                            fillOpacity: 0.35,
                        });
                        map.setOptions({
                            draggable: true,
                            scrollwheel: true,
                            disableDoubleClickZoom: true
                        });
                        polygonArea.push(poly);
                        google.maps.event.clearListeners(map.getDiv(), 'mousedown');
                        let array = poly.getPath().getArray();
                        let x1: any[] = [];
                        let y1: any[] = [];
                        array.forEach((item) => {
                            x1.push(item.lat());
                            y1.push(item.lng());
                        });
                        markers.forEach(item => func(item, x1, y1));
                    });
                });
            }

            let func = (item, x1, y1) => {
                let b = this.inclusionMarkersPolygon(item, x1, y1);
                if (b === false) {
                    item.setMap(null);
                    if (markerCluster != null) {
                        markerCluster.removeMarker(item);
                        markerCluster.repaint();
                    }

                }
            }
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
    setMarkers() {

        this.clearMap();


    }
    clearMap() {
        try {
            markers.forEach((item) => {
                item.setMap(null);
            });
            if (markerCluster != null) {
                markerCluster.clearMarkers();
                console.log('markerCluster', markerCluster)

            }

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