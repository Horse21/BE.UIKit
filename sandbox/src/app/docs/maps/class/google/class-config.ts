import { Injectable } from "@angular/core";
import { ConfigMap } from "../../interface/interface-config";
declare var google: any;
declare var require: any;
export class Config implements ConfigMap {
    ShowMarker(map: any, obj: any){
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(55.753215, 37.622504),
            draggable: false,
            clickable: true,
            icon: { url: require('../../images/icon/icon_hotel.png') },
            title: 'Hotel Name'
        });

        marker.setMap(map);

    }

    SetZoomLevel(map: any, type: string) {
       
    }
    DrawingShapesMap(map: any, type: string) {
       
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
}