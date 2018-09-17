import { SearchPlacesMap } from "../../interface/i-search-places";
import { ObjectMap } from "../class-objmap";

 export class Search implements SearchPlacesMap {
    public SearchMap(text:string){
        console.log('Searchresults',text)
        
    }
}