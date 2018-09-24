import { Injectable } from "@angular/core";
import { ISearchPlacesMap } from "../../interface/i-search-places";
import { Point, Address } from "../../interface/i-point";
import * as  ObjectMap from "../class-objmap";
import * as  config from "./class-config";

export namespace Google {
    declare var google: any;

    @Injectable()
    export class Search implements ISearchPlacesMap {
        constructor(private objMap: ObjectMap.Map.ObjectMap, private config: config.Google.Options) {
        }
        GetDetailsPointAutocomplete(placeid: string) {
            let placesService = new google.maps.places.PlacesService(this.objMap.map);
            let point: Point = new Point();
            placesService.getDetails({ placeId: placeid }, (place, status) => {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    if (place) {
                        let point: Point = new Point();
                        point.Address = new Address();
                        point.Hotelname = place.name;
                        point.id = place.id;
                        point.placeId = place.place_id;
                        point.Address.Lng =place.geometry.location.lng();
                        point.Address.Lat = place.geometry.location.lat();    
                        this.config.showMarker(point)
                    }
                }

            });
        }
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
                        point.Hotelname = place.description;
                        point.placeId = place.place_id;
                        result.push(point)
                    }
                }
            }

            );
            return result;
        }
    }


}
