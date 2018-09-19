import { ISearchPlacesMap } from "../../interface/i-search-places";
import * as  ObjectMap from "../class-objmap";
import { Injectable } from "@angular/core";
export namespace Map.Leaflet {
    @Injectable()
    export class SearchLeaflet implements ISearchPlacesMap {
        public SearchMap(text: string) {
            console.log('Searchresults', text)

        }
    }
}