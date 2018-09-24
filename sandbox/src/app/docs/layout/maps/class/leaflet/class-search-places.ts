import { Injectable } from "@angular/core";
import { ISearchPlacesMap} from "../../interface/i-search-places";
import { Point } from "../../interface/i-point";

export namespace Map.Leaflet {
    @Injectable()
    export class SearchLeaflet implements ISearchPlacesMap {
        public SearchMap(text: string):Point[] {
            return null;

        }
    }
}