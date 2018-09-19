import { Injectable } from "@angular/core";
import { IMainMap } from "../../interface/i-main";
import * as InitializeLeaflet  from "./class-initialize";
import * as EventsLeaflet  from "./class-event";
import * as  OptionsLeaflet  from "./class-config";
import * as MarkerLeaflet  from "./class-marker";
import * as MarkerclusterLeaflet  from "./class-markercluster";
import * as InfoWindowLeaflet  from "./class-infowindow";
import * as SearchLeaflet  from "./class-search-places";
export namespace Map.Leaflet {
@Injectable()
export class LeafletMap implements IMainMap {
    constructor(
        public init: InitializeLeaflet.Map.Leaflet.InitializeLeaflet,
        public events: EventsLeaflet.Map.Leaflet.EventsLeaflet,
        public config: OptionsLeaflet.Map.Leaflet.OptionsLeaflet,
        public marker: MarkerLeaflet.Map.Leaflet.MarkerLeaflet,
        public markerCluster: MarkerclusterLeaflet.Map.Leaflet.MarkerclusterLeaflet,
        public infoWindow: InfoWindowLeaflet.Map.Leaflet.InfoWindowLeaflet,
        public search: SearchLeaflet.Map.Leaflet.SearchLeaflet
    ) 
    { }
}
}