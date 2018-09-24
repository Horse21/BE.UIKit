import { Injectable } from "@angular/core";
import { Observable, Observer, config } from 'rxjs';
import { IEventMap } from "../../interface/i-event";
import * as  ObjectMap from "../class-objmap";
export namespace Map.Leaflet {
    declare var require: any;
    declare var placeId: any;
    declare var event: any;
    declare var document: any;
    declare var google: any;
    declare var addListener: any;
    @Injectable()
    export class EventsLeaflet implements IEventMap {
        constructor(private objMap: ObjectMap.Map.ObjectMap) {
        }
        private listenEvent<E>(eventName: string): Observable<E> {
            return new Observable((observer: Observer<E>) => {
                this.objMap.map.on(eventName, (arg: E) => { observer.next(arg); });
            });
        }

        idle(callback: () => void) {
        }

        zoomend(callback: () => void) {
            this.listenEvent<void>("zoomend").subscribe(() => {
                callback();
            })
        }

        dragend(callback: () => void) {
            this.listenEvent<void>("dragend").subscribe(() => {
                callback();
            })
        }

        boundsChange(callback: () => void) {
        }

        zoomChange(callback: () => void) {

        }
        clickMap(callback: () => void) {
            this.listenEvent<void>("click").subscribe(() => {
                callback();
            })
        }
    }
}
