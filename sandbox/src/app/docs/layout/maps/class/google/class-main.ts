import { Injectable } from "@angular/core";
import { IMainMap } from "../../interface/i-main";
import * as Initialize from "./class-initialize";
import * as Events from "./class-event";
import * as Options from "./class-config";
import * as Marker from "./class-marker";
import * as Markercluster from "./class-markercluster";
import * as InfoWindow from "./class-infowindow";
import * as Search from "./class-search-places";

export namespace Google {
    @Injectable()
    export class Map implements IMainMap {
        constructor(
            public init: Initialize.Google.Initialize,
            public events: Events.Google.Events,
            public config: Options.Google.Options,
            public marker: Marker.Google.Marker,
            public markerCluster: Markercluster.Google.Markercluster,
            public infoWindow: InfoWindow.Google.InfoWindow,
            public search: Search.Google.Search
        ) { }
    }
}