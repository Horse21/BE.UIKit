import { Injectable } from "@angular/core";
import { Observable, Observer, config } from 'rxjs';
import { IEventMap } from "../../interface/i-event";
import * as  ObjectMap from "../class-objmap";
export namespace Google {
    @Injectable()
    export class Events implements IEventMap {

        constructor(private objMap: ObjectMap.Map.ObjectMap) {
        }
        listenEvent<E>(objMap: any, eventName: string): Observable<E> {
            return new Observable((observer: Observer<E>) => {
                objMap.addListener(eventName, (arg: E) => { observer.next(arg); });
            });
        }

        idle(callback: () => void) {
            this.listenEvent<void>(this.objMap.map, "idle").subscribe(() => {
                let bounds = this.objMap.map.getBounds();
                if (bounds) {
                    callback();
                }


            })
        }

        zoomend(callback: () => void) {

        }

        dragend(callback: () => void) {

        }

        boundsChange(callback: () => void) {

        }

        zoomChange() {

        }
        clickMap() {
            this.listenEvent<any>(this.objMap.map, "click").subscribe((event) => {
                if (event.placeId) {
                    event.stop();
                }
                else {
                }
            })
        }
    }
}