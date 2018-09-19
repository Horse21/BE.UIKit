import { ISearchPlacesMap } from "../../interface/i-search-places";
import { Injectable } from "@angular/core";

export namespace Map.Yandex {
    @Injectable()
    export class SearchYandex implements ISearchPlacesMap {
        public SearchMap(text: string) {
            console.log('Searchresults', text)

        }
    }
}