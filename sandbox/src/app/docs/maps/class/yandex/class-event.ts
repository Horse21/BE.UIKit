import { Injectable } from "@angular/core";
import { Observable, Observer, config } from 'rxjs';
import { IEventMap } from "../../interface/i-event";
import * as  ObjectMap from "../class-objmap";
export namespace Map.Yandex {
    declare var get: any;
    @Injectable()
    export class EventsYandex implements IEventMap {

        constructor(private objMap: ObjectMap.Map.ObjectMap) {
        }
        private listenEvent<E>(eventName: string): Observable<E> {
            return new Observable((observer: Observer<E>) => {
                this.objMap.map.events.add(eventName, (arg: E) => { observer.next(arg); });
            });
        }

        idle(callback: () => void) {

        }

        zoomend(callback: () => void) {

        }

        dragend(callback: () => void) {

        }

        boundsChange(callback: () => void) {
            this.listenEvent<void>("boundschange").subscribe((event) => {
                callback();
            })
        }

        zoomChange(callback: () => void) {

        }
        clickMap(callback: () => void) {
            this.listenEvent<void>("click").subscribe((event) => {
                callback();
            })
        }
    }
}
