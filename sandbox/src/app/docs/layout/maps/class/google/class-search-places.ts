import { Injectable } from "@angular/core";
import { ISearchPlacesMap } from "../../interface/i-search-places";
import { Point } from "../../interface/i-point";

export namespace Google {
    declare var google: any;
    
    @Injectable()
    export class Search implements ISearchPlacesMap {
        public SearchMap(text: string): Point[] {
            let service = new google.maps.places.AutocompleteService();
            let request = {
                input: text,
                language: 'en'
            };
            let result = [];
            service.getPlacePredictions(request, function (results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (let i = 0; i < results.length; i++) {
                        let place = results[i];
                        let point: Point = new Point();
                        point.name = place.description;
                        point.id = place.id;
                        result.push(point)
                    }
                }
            }

            );
            return result;
        }
    }


}
