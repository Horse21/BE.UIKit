import { Injectable } from "@angular/core";
import { MapOptions } from "../../interface/interface-config";
import { MapsComponent } from "../../maps.component";
declare var google: any;
declare var require: any;
declare var clearMarkers:any;
//declare var  Markers:any[];

var Markers = [];

export class Options implements MapOptions {
    ShowMarker(map: any, obj: any, markercluster:any){

        console.log(obj,'ShowMarker');
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(obj.Address.Lat, obj.Address.Lng),
            draggable: false,
            clickable: true,
            icon: { url: require('../../images/icon/icon_hotel.png') },
            title: obj.Hotelname
        });

        marker.setMap(map);
        Markers.push(marker);
        console.log(markercluster);
       // marker.push()
       //markercluster.addMarker(marker, true);
  if(markercluster ! = null){
    
  }
       console.log(Markers,'Markers')
      
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
}