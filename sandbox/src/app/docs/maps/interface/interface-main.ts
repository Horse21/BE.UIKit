import { InitMap } from "./interface-init";
import { EventMap } from "./interface-event";
import { MapOptions } from "./interface-config";
import { MarkerMap } from "./interface-marker";
import { InfoWindowMap } from "./interface-infowindow";
import { MarkerClusterMap } from "./interface-markercluster";
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