import { AbstractSearch } from "../../abstract/abstract-search";
import { Injectable } from "@angular/core";
import { IPoint } from "../../interfaces/i-point";
import { ResponseStatus } from "./enum/e-status-response ";
import { Point } from "../../entity/point";
import { Position } from "../../entity/position";
import { Address } from "../../classes/address";

declare var google;

@Injectable()
export class BaiduSearchMap extends AbstractSearch {

    search(query: string): Array<IPoint> {

        let result = [];
        let service = new google.maps.places.AutocompleteService();
        let request = {
            input: query,
            language: 'en'
        };

        service.getPlacePredictions(request, (results, status) => {

            if (status == ResponseStatus.OK) {

                for (var i = 0; i < results.length; i++) {
                    let point: Point = new Point();
                    point.position = new Position();
                    point.address = new Address();
                    let place = results[i];
                    point.id = place.place_id;
                    point.name = place.description;
                    point.googlePlaceId = place.place_id;
                    point.subtype = place.types[0];
                    point.title = place.formatted_address;
                    point.type = 'internet'
                    point.source = 'google';

                    result.push(point)
                }

            }
        }

        );
        return result;
    }

}