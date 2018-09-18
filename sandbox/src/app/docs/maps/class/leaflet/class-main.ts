import { Injectable } from "@angular/core";
import { IMainMap } from "../../interface/i-main";
import { InitializeLeaflet } from "./class-initialize";
import { EventsLeaflet } from "./class-event";
import { OptionsLeaflet } from "./class-config";
import { MarkerLeaflet } from "./class-marker";
import { MarkerclusterLeaflet } from "./class-markercluster";
import { InfoWindowLeaflet } from "./class-infowindow";
import { SearchLeaflet } from "./class-search-places";

@Injectable()
export class LeafletMap implements IMainMap {
    constructor(
        public init: InitializeLeaflet,
        public events: EventsLeaflet,
        public config: OptionsLeaflet,
        public marker: MarkerLeaflet,
        public markerCluster: MarkerclusterLeaflet,
        public infoWindow: InfoWindowLeaflet,
        public search: SearchLeaflet
    ) 
    { }
}