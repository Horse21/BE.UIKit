import { ISearchPlacesMap } from "../../interface/i-search-places";
import * as  ObjectMap from "../class-objmap";
import { Injectable } from "@angular/core";

export namespace Map.Baidu {
    @Injectable()
    export class SearchBaidu implements ISearchPlacesMap {
        public SearchMap(text: string) {
            console.log('Searchresults', text)

        }
    }
}