import { AbstractSearch } from "../../abstract/abstract-search";
import { Injectable } from "@angular/core";
import { Point } from "./interfaces/i-inner";
import { IPoint } from "../../interfaces/i-point";
import { ResponseStatus } from "./enum/i-status-response ";

declare var google;

@Injectable()
export class GoogleSearchMap extends AbstractSearch {

    details(placeId: string): IPoint {

        let placesService = new google.maps.places.PlacesService(this.map.api);
        placesService.getDetails({ placeId: placeId }, (place, status) => {

            if (status == ResponseStatus.OK) {

                if (place) {

                }
            }

        });

        return null;
    }

    search(query: string): Array<IPoint> {
        let service = new google.maps.places.AutocompleteService();
        let request = {
            input: query,
            language: 'en'
        };
        let result = [];
        service.getPlacePredictions(request, function (results, status) {

            if (status == ResponseStatus.OK) {
                console.log(results);
            }
        }

        );
        return null;
    }




}