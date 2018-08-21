import { Injectable } from "@angular/core";
import { Observable, Observer, config } from 'rxjs';
import { EventMap } from "../../interface/interface-event";

declare var require: any;
declare var placeId: any;
declare var event: any;
declare var document: any;
declare var google: any;
declare var addListener: any;

export class Events implements EventMap {

    Subscribe(map: any) {
        this.Click(map);
        this.BoundsChange(map);
        this.Idle(map);
        this.ZoomChange(map);
    }

    ListenEvent<E>(map: any, eventName: string): Observable<E> {
        return new Observable((observer: Observer<E>) => {
            map.addListener(eventName, (arg: E) => { observer.next(arg); });
        });
    }

    Idle(map: any) {
        this.ListenEvent<void>(map, "idle").subscribe(() => {
            console.log("idle");
            let bounds = map.getBounds();
            if (bounds) {
                console.log('bounds', bounds);
                let SW = bounds.getSouthWest();
                let NE = bounds.getNorthEast();
            }
        })
    }

    BoundsChange(map: any) {
        this.ListenEvent<void>(map, "bounds_changed").subscribe(() => {
            console.log("bounds_changed");
        })
    }

    ZoomChange(map: any) {
        this.ListenEvent<void>(map, "zoom_changed").subscribe(() => {
            console.log("zoom_changed");
        })
    }

    //cb: Function
    Click(map: any) {
        this.ListenEvent<any>(map, "click").subscribe((event) => {
            if (event.placeId) {
                event.stop();
                console.log(event.placeId, 'event.placeId')

            }
            else {
                console.log(event.latLng)
               // cb();
            }
        })
    }
}
