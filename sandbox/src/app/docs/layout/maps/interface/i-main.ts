import { IInitMap } from "./i-init";
import { IEventMap } from "./i-event";
import { IMapOptions } from "./i-config";
import { IMarkerMap } from "./i-marker";
import { IInfoWindowMap } from "./i-infowindow";
import { IMarkerClusterMap } from "./i-markercluster";
import { ISearchPlacesMap } from "./i-search-places";
import * as ObjectMap  from "../class/class-objmap";

export interface IMainMap {
   search:ISearchPlacesMap;
   init: IInitMap;   
   config: IMapOptions;
   events: IEventMap;
   marker: IMarkerMap;
   markerCluster: IMarkerClusterMap;
   infoWindow: IInfoWindowMap;
}