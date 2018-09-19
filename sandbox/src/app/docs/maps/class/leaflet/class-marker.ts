import { Injectable } from "@angular/core";
import { Observable, Observer, config } from 'rxjs';
import { IMarkerMap } from "../../interface/i-marker";
export namespace Map.Leaflet {
    declare var google: any;
    declare var require: any;
    @Injectable()
    export class MarkerLeaflet implements IMarkerMap {
        listenEvent<E>(marker: any, eventName: string): Observable<E> {
            return new Observable((observer: Observer<E>) => {
                marker.addListener(eventName, (arg: E) => { observer.next(arg); });
            });
        }
        clickMarker(marker: any) {
            console.log('click Marker', marker);
        }
    }
}