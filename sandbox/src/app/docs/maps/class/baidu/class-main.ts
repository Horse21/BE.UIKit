import { Injectable } from "@angular/core";
import { IMainMap } from "../../interface/i-main";
import { InitializeBaidu } from "./class-initialize";
import { EventsBaidu } from "./class-event";
import { OptionsBaidu } from "./class-config";
import { MarkerBaidu } from "./class-marker";
import { MarkerclusterBaidu } from "./class-markercluster";
import { InfoWindowBaidu } from "./class-infowindow";
import { SearchBaidu } from "./class-search-places";

@Injectable()
export class BaiduMap implements IMainMap {
    constructor(
        public init: InitializeBaidu,
        public events: EventsBaidu,
        public config: OptionsBaidu,
        public marker: MarkerBaidu,
        public markerCluster: MarkerclusterBaidu,
        public infoWindow: InfoWindowBaidu,
        public search: SearchBaidu
    ) 
    { }
}