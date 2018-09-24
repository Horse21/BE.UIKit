import { Injectable } from "@angular/core";
import { ISearchPlacesMap} from "../../interface/i-search-places";
import { Point } from "../../interface/i-point";

export namespace Map.Baidu {
    @Injectable()
    export class SearchBaidu implements ISearchPlacesMap {
        public SearchMap(text: string):Point[] {
            return null;
        }

        GetDetailsPointAutocomplete(placeid: string) {}
    }
}