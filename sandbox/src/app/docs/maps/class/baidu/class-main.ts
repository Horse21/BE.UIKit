import { Injectable } from "@angular/core";
import { InitMap } from "../../interface/i-init";
import { EventMap } from "../../interface/i-event";
import { MapOptions } from "../../interface/i-config";
import { MainMap } from "../../interface/i-main";
import { MarkerMap } from "../../interface/i-marker";
import { InfoWindowMap } from "../../interface/i-infowindow";
import { MarkerClusterMap } from "../../interface/i-markercluster";
import { Options } from "./class-config";
import { Initialize } from "./class-Initialize";
import { Events } from "./class-event";
import { Marker } from "./class-marker";
import { Markercluster } from "./class-markercluster";
import { InfoWindow } from "./class-infowindow";
import { ObjectMap } from "../class-objmap";

export interface LatLng {
    constructor(lat: number, lng: number): void;
    lat(): number;
    lng(): number;
}

@Injectable()
export class BaiduMap implements MainMap {
    init: InitMap;
    events: EventMap;
    config: Options;
    marker: MarkerMap;
    infoWindow: InfoWindowMap;
    markerCluster: MarkerClusterMap;
    public traffic: any;
    public transit: any;
    public cluster:any;

    constructor(private objectMap: ObjectMap) {
        this.init = new Initialize();
        // this.events = new Events();
        // this.config = new Options(this.objectMap);
        // this.marker = new Marker();
        // this.infoWindow = new InfoWindow();
        // this.markerCluster = new Markercluster();

    }

    public showMarkers(markers: any[]){
        this.config.showMarker(markers, this.markerCluster);
    }
}