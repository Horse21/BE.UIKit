import { Injectable } from "@angular/core";
import { Observable, Observer, config } from 'rxjs';
import { LoadApiMap, InitMap } from "../../interface/interface-init";
import { EventMap } from "../../interface/interface-event";
import { MapOptions } from "../../interface/interface-config";
import { MainMap } from "../../interface/interface-main";
import { MarkerMap } from "../../interface/interface-marker";
import { InfoWindowMap } from "../../interface/interface-infowindow";
import { MarkerClusterMap } from "../../interface/interface-markercluster";
import { Options } from "./class-config";
import { Initialize } from "./class-Initialize";
import { Events } from "./class-event";
import { Marker } from "./class-marker";
import { Markercluster } from "./class-markercluster";
import { InfoWindow } from "./class-infowindow";



declare var require: any;
declare var placeId: any;
declare var event: any;
declare var document: any;
declare var google: any;
declare var addListener: any;

export interface LatLng {
    constructor(lat: number, lng: number): void;
    lat(): number;
    lng(): number;
}

@Injectable()
export class GoogleMap implements MainMap {
    init: InitMap;
    events: EventMap;
    config: MapOptions;
    marker: MarkerMap;
    infowindow: InfoWindowMap;
    markercluster: MarkerClusterMap;
    public map: any;
    public traffic: any;
    public transit: any;
    public Markers:any[];

    constructor() {
        this.init = new Initialize();
        this.events = new Events();
        this.config = new Options();
        this.marker = new Marker();
        this.infowindow = new InfoWindow();
        this.markercluster = new Markercluster();

    }
}