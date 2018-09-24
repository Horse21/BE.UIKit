import { Injectable } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { IEventMap } from "../../interface/i-event";
import * as  ObjectMap from "../class-objmap";

export namespace Map.Baidu {

    @Injectable()
    export class EventsBaidu implements IEventMap {
        constructor(private objMap: ObjectMap.Map.ObjectMap) {
        }
        private listenEvent<E>(eventName: string): Observable<E> {
            return new Observable((observer: Observer<E>) => {
                this.objMap.map.addEventListener(eventName, (arg: E) => { observer.next(arg); });
            });
        }

        idle(callback: () => void) {
            this.listenEvent<void>("zoomend").subscribe(() => {
                let bounds = this.objMap.map.getBounds();
            })
        }

        zoomend(callback: () => void) {
            this.listenEvent<void>("zoomend").subscribe(() => {
                let bounds = this.objMap.map.getBounds();
                if (bounds) {
                    callback();
                }
            })
        }

        dragend(callback: () => void) {
            this.listenEvent<void>("dragend").subscribe(() => {
                let bounds = this.objMap.map.getBounds();
                if (bounds) {
                    callback();
                }
            })
        }

        boundsChange(callback: () => void) {
            this.listenEvent<void>("dragend").subscribe(() => {
                let bounds = this.objMap.map.getBounds();
                if (bounds) {
                    callback();
                }
            })
        }

        zoomChange(callback: () => void) {
            this.listenEvent<void>("dragend").subscribe(() => {
                let bounds = this.objMap.map.getBounds();
                if (bounds) {
                    callback();
                }
            })
        }
        clickMap(callback: () => void) {
            this.listenEvent<void>("dragend").subscribe(() => {
                let bounds = this.objMap.map.getBounds();
                if (bounds) {
                    callback();
                }
            })
        }
    }
}
