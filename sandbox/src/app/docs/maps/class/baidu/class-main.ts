import { Injectable } from "@angular/core";
import { IMainMap } from "../../interface/i-main";
import  *  as SearchBaidu from "./class-search-places";
import  *  as InitializeBaidu  from "./class-initialize";
import  *  as EventsBaidu from "./class-event";
import  *  as OptionsBaidu  from "./class-config";
import  *  as MarkerBaidu from "./class-marker";
import  *  as MarkerclusterBaidu  from "./class-markercluster";
import  *  as InfoWindowBaidu  from "./class-infowindow";

export namespace Map.Baidu {

    @Injectable()
    export class BaiduMap implements IMainMap {
        constructor(
            public init: InitializeBaidu.Map.Baidu.InitializeBaidu,
            public events: EventsBaidu.Map.Baidu.EventsBaidu,
            public config: OptionsBaidu.Map.Baidu.OptionsBaidu,
            public marker: MarkerBaidu.Map.Baidu.MarkerBaidu,
            public markerCluster: MarkerclusterBaidu.Map.Baidu.MarkerclusterBaidu,
            public infoWindow: InfoWindowBaidu.Map.Baidu.InfoWindowBaidu,
            public search: SearchBaidu.Map.Baidu.SearchBaidu
        ) 
        { }
    }
}
