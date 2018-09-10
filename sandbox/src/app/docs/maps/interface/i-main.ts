import { InitMap } from "./i-init";
import { EventMap } from "./i-event";
import { MapOptions } from "./i-config";
import { MarkerMap } from "./i-marker";
import { InfoWindowMap } from "./i-infowindow";
import { MarkerClusterMap } from "./i-markercluster";
import { ObjectMap } from "../class/class-objmap";
export interface MainMap {
    //objectMap: ObjectMap;
    traffic: any;
    transit: any;
    cluster:any;
    init: InitMap;   
    config: MapOptions;
    events: EventMap;
    marker: MarkerMap;
    markerCluster: MarkerClusterMap;
    infoWindow: InfoWindowMap;
}