import { Injectable } from "@angular/core";
import { IMainMap } from "../../interface/i-main";
import { InitializeGoogle } from "./class-initialize";
import { EventsGoogle } from "./class-event";
import { OptionsGoogle } from "./class-config";
import { MarkerGoogle } from "./class-marker";
import { MarkerclusterGoogle } from "./class-markercluster";
import { InfoWindowGoogle } from "./class-infowindow";
import { SearchGoogle } from "./class-search-places";

@Injectable()
export class GoogleMap implements IMainMap {
    constructor(
        public init: InitializeGoogle,
        public events: EventsGoogle,
        public config: OptionsGoogle,
        public marker: MarkerGoogle,
        public markerCluster: MarkerclusterGoogle,
        public infoWindow: InfoWindowGoogle,
        public search: SearchGoogle
    ) 
    { }
}