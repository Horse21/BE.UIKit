import { Injectable } from "@angular/core";
import { IMainMap } from "../../interface/i-main";
import * as InitializeGoogle from "./class-initialize";
import * as EventsGoogle from "./class-event";
import * as OptionsGoogle from "./class-config";
import * as MarkerGoogle from "./class-marker";
import * as MarkerclusterGoogle from "./class-markercluster";
import * as InfoWindowGoogle from "./class-infowindow";
import * as SearchGoogle from "./class-search-places";

export namespace Map.Google {
    @Injectable()
    export class GoogleMap implements IMainMap {
        constructor(
            public init: InitializeGoogle.Map.Google.InitializeGoogle,
            public events: EventsGoogle.Map.Google.EventsGoogle,
            public config: OptionsGoogle.Map.Google.OptionsGoogle,
            public marker: MarkerGoogle.Map.Google.MarkerGoogle,
            public markerCluster: MarkerclusterGoogle.Map.Google.MarkerclusterGoogle,
            public infoWindow: InfoWindowGoogle.Map.Google.InfoWindowGoogle,
            public search: SearchGoogle.Map.Google.SearchGoogle
        ) { }
    }
}