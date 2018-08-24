import { Injectable } from "@angular/core";
import { Observable, Observer, config } from 'rxjs';
import { MarkerMap } from "../../interface/interface-marker";

declare var google: any;
declare var require: any;

export class Marker implements MarkerMap {
    listenEvent<E>(marker: any, eventName: string): Observable<E> {
        return new Observable((observer: Observer<E>) => {
            marker.addListener(eventName, (arg: E) => { observer.next(arg); });
        });
    }
    clickMarker(marker: any) {
        console.log('click Marker', marker);
    }
}