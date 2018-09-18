import { ISearchPlacesMap } from "../../interface/i-search-places";
import { ObjectMap } from "../class-objmap";
import { Injectable } from "@angular/core";
declare var google:any;
@Injectable()
 export class SearchGoogle implements ISearchPlacesMap {
    public SearchMap(text:string){
        var service = new google.maps.places.AutocompleteService();

        let request = {
            input: text,
            language: 'en'
        };

        service.getPlacePredictions(request, function (results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {

                console.log('Searchresults',results)

            }

            });
    }
}