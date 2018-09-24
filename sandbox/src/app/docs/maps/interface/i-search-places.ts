import { Point } from "./i-point";

export interface ISearchPlacesMap {
    SearchMap(type: string): Point[];
    GetDetailsPointAutocomplete(placeid: string);
}


