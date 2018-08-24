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
    subscribe(map: any) {
        this.clickMap(map);
        this.boundsChange(map);
        this.idle(map);
        this.zoomChange(map);
    }

    listenEvent<E>(map: any, eventName: string): Observable<E> {
        return new Observable((observer: Observer<E>) => {
            map.addListener(eventName, (arg: E) => { observer.next(arg); });
        });
    }

    idle(map: any) {
        this.listenEvent<void>(map, "idle").subscribe(() => {
            console.log("idle");
            let bounds = map.getBounds();
            if (bounds) {
                console.log('bounds', bounds);
                let SW = bounds.getSouthWest();
                let NE = bounds.getNorthEast();
            }
        })
    }

    boundsChange(map: any) {
        this.listenEvent<void>(map, "bounds_changed").subscribe(() => {
            console.log("bounds_changed");
        })
    }

    zoomChange(map: any) {
        this.listenEvent<void>(map, "zoom_changed").subscribe(() => {
            console.log("zoom_changed");
        })
    }
    clickMap(map: any) {
        this.listenEvent<any>(map, "click").subscribe((event) => {
            if (event.placeId) {
                event.stop();
                console.log(event.placeId, 'event.placeId')
            }
            else {
                console.log(event.latLng)
            }
        })
    }
}
