import { ISearchPlacesMap } from "../../interface/i-search-places";
import { ObjectMap } from "../class-objmap";
import { Injectable } from "@angular/core";
@Injectable()
 export class SearchLeaflet implements ISearchPlacesMap {
    public SearchMap(text:string){
        console.log('Searchresults',text)
        
    }
}