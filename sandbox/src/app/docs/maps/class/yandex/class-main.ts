import { Injectable } from "@angular/core";
import { IMainMap } from "../../interface/i-main";
import { InitializeYandex } from "./class-initialize";
import { EventsYandex } from "./class-event";
import { OptionsYandex } from "./class-config";
import { MarkerYandex } from "./class-marker";
import { MarkerclusterYandex } from "./class-markercluster";
import { InfoWindowYandex } from "./class-infowindow";
import { SearchYandex } from "./class-search-places";

@Injectable()
export class YandexMap implements IMainMap {
    constructor(
        public init: InitializeYandex,
        public events: EventsYandex,
        public config: OptionsYandex,
        public marker: MarkerYandex,
        public markerCluster: MarkerclusterYandex,
        public infoWindow: InfoWindowYandex,
        public search: SearchYandex
    ) 
    { }
}