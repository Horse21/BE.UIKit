import { SearchPlacesMap } from "../../interface/i-search-places";
import { ObjectMap } from "../class-objmap";
declare var google:any;

 export class Search implements SearchPlacesMap {
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