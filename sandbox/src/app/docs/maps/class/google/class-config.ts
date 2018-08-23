import { Injectable } from "@angular/core";
import { MapOptions } from "../../interface/interface-config";
import { MapsComponent } from "../../maps.component";
declare var google: any;
declare var require: any;
declare var clearMarkers: any;
//declare var  Markers:any[];

var Markers = [];
var Radius: any;
var PolygonArea: any;

export class Options implements MapOptions {
    ShowMarker(map: any, obj: any, markercluster: any) {

        console.log(obj, 'ShowMarker');
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(obj.Address.Lat, obj.Address.Lng),
            draggable: false,
            clickable: true,
            icon: { url: require('../../images/icon/icon_hotel.png') },
            title: obj.Hotelname
        });

        marker.setMap(map);
        Markers.push(marker);
        if (markercluster !== null) {
            markercluster.addMarker(marker, true);
        }
    }

    SetZoomLevel(map: any, type: string) {
        let currentZoom = map.getZoom();
        if (type === 'plus') {
            map.setZoom(currentZoom + 1);
        }
        else {
            map.setZoom(currentZoom - 1);
        }
    }
    DrawingShapesMap(map: any, type: any) {
        console.log('DrawingShapesMap', map, type);
        var drawingMode: any
       // declare var Radius: any;
        let drawingManager,
        var radius: number = 10000;
        if (this.drawingManager != null) {
            this.drawingManager.setMap(null);
        }

        if (this.Radius != null) {
            this.Radius.setMap(null);
        }

        if (this.PolygonArea != null) {
            this.PolygonArea.setMap(null);
        }
        var option = {};

        var option: any;
        if (type ==+ 'stop') {
            this.drawingMode = null;
        }

        if (type === 'circle') {
            this.drawingMode = google.maps.drawing.OverlayType.CIRCLE;
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
            this.Radius = new google.maps.Circle(option);
            this.Radius.setMap(map);
            // for (var i = 0; i < this.PointMap.length; i++) {
            //     var point = this.PointMap[i];
            //     var rt = AppMap.Distance(AppMap.Map.SelectMarker.Point.Position.Latitude, AppMap.Map.SelectMarker.Point.Position.Longitude, point.Point.Position.Latitude, point.Point.Position.Longitude);
            //     console.log(rt)
            //     if (rt > 10) {
            //         console.log(point)

            //         // point.setVisible(false);
            //         point.setMap(null);
            //         if (markerCluster != null) {
            //             markerCluster.removeMarker(point);

            //         };

            //     }
            // }
            google.maps.event.addListener(this.Radius, 'radius_changed', function (event) {
                console.log('radius_changed')

            });
        }

        if (type == 'area') {
            this.drawingMode = null;
            var poly: any;
            map.setOptions({
                draggable: false,
                scrollwheel: false,
                disableDoubleClickZoom: false
            });

            google.maps.event.addDomListener(map.getDiv(), 'mousedown', function (e) {
                console.log('mousedown')
                PolygonArea = new google.maps.Polyline({
                    map: map, clickable: false, strokeColor: '#1E90FF',
                    strokeOpacity: 0.9,
                    strokeWeight: 3.5,
                    fillColor: '#1E90FF',
                    fillOpacity: 0.35,
                });

                //move-listener
                var move = google.maps.event.addListener(map, 'mousemove', function (e) {
                    PolygonArea.getPath().push(e.latLng);
                   
                });

                //mouseup-listener
                google.maps.event.addListenerOnce(map, 'mouseup', function (e) {
                    console.log('mouseup')
                    google.maps.event.removeListener(move);
                    var path = PolygonArea.getPath();
                    PolygonArea.setMap(null);
                    PolygonArea = new google.maps.Polygon({
                        map: map, path: path, strokeColor: '#1E90FF',
                        strokeOpacity: 0.9,
                        strokeWeight: 3.5,
                        fillColor: '#1E90FF',
                        fillOpacity: 0.35,
                    });

                    google.maps.event.clearListeners(map.getDiv(), 'mousedown');
                    map.setOptions({
                        draggable: true,
                        scrollwheel: true,
                        disableDoubleClickZoom: true
                    });
                });

            });




        }


    }
    InclusionMarkersRadius(map: any, Lat1: number, Lng1: number, Lat2: number, Lng2: number) {

    }
    InclusionMarkersPolygon(coord: any, xp: any, yp: any) {

    }
    SetZoomMin(map: any, zoom: number) {

    }
    SetZoomMax(map: any, zoom: number) {

    }
    SetMarkers(map: any, markers: any[]) {

    }
    ClearMap(map: any) {
        for (var i = 0; i < Markers.length; i++) {
            Markers[i].setMap(null);
        }

    }
    ResizeMap(map: any) {

    }
    RouteMap(map: any, start: any, end: any, show: boolean) {

    }
    FitBounds(map: any) {

    }
    SetCenterMap(map: any) {

    }
    GetBounds(map: any) {

    }
    ResetMap(map: any) {

    }

    GetZoom(map: any): number {
        return map.getZoom();
    }

    SetZoom(map: any, zoom: number) {
        map.setZoom(zoom);
    }

    TransitLayer(map: any, transit: any, boolean: boolean) {

        if (boolean) {
            transit.setMap(map);
        }
        else {
            transit.setMap(null);
        }
    }

    TrafficLayer(map: any, traffic: any, boolean: boolean) {
        if (boolean) {
            traffic.setMap(map);
        }
        else {
            traffic.setMap(null);
        }
    }
    GetAddress(map: any, coord: any) {

    }

    draggableMap(map: any, boolean: any) {

        if (boolean) {
            map.setOptions({
                draggable: false,
                zoomControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: false
            });
        }
        else {
            map.setOptions({
                draggable: true,
                zoomControl: true,
                scrollwheel: true,
                disableDoubleClickZoom: true
            });
        }
    }
}