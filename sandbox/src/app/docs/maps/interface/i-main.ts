import { InitMap } from "./i-init";
import { EventMap } from "./i-event";
import { MapOptions } from "./i-config";
import { MarkerMap } from "./i-marker";
import { InfoWindowMap } from "./i-infowindow";
import { MarkerClusterMap } from "./i-markercluster";
export interface MainMap {
    map: any;
    traffic: any;
    transit: any;
    cluster:any;
    init: InitMap;
    events: EventMap;
    config: MapOptions;
    marker: MarkerMap;
    markerCluster: MarkerClusterMap;
    infoWindow: InfoWindowMap;
}