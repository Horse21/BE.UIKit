import { Injectable } from "@angular/core";
import { IMainMap } from "../../interface/i-main";
import * as  InitializeYandex from "./class-initialize";
import * as  EventsYandex from "./class-event";
import * as  OptionsYandex from "./class-config";
import * as  MarkerYandex from "./class-marker";
import * as  MarkerclusterYandex from "./class-markercluster";
import * as  InfoWindowYandex from "./class-infowindow";
import * as  SearchYandex from "./class-search-places";

export namespace Map.Yandex {
    @Injectable()
    export class YandexMap implements IMainMap {
        constructor(
            public init: InitializeYandex.Map.Yandex.InitializeYandex,
            public events: EventsYandex.Map.Yandex.EventsYandex,
            public config: OptionsYandex.Map.Yandex.OptionsYandex,
            public marker: MarkerYandex.Map.Yandex.MarkerYandex,
            public markerCluster: MarkerclusterYandex.Map.Yandex.MarkerclusterYandex,
            public infoWindow: InfoWindowYandex.Map.Yandex.InfoWindowYandex,
            public search: SearchYandex.Map.Yandex.SearchYandex
        ) { }
    }
}