import { InitMap } from "../interface/interface-init";
import { EventMap } from "../interface/interface-event";
import { ConfigMap } from "../interface/interface-config";
import { MarkerMap } from "../interface/interface-marker";
import { InfoWindowMap } from "../interface/interface-infowindow";
import { MarkerClusterMap } from "../interface/interface-markercluster";
export interface MainMap {
    map: any;
    traffic: any;
    transit: any;
    init: InitMap;
    events: EventMap;
    config: ConfigMap;
    marker: MarkerMap;
    markercluster: MarkerClusterMap
    infowindow: InfoWindowMap;
}