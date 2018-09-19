import { Injectable } from "@angular/core";
import { Observable, Observer, config } from 'rxjs';
import { IEventMap } from "../../interface/i-event";

export namespace Map.Yandex {
    declare var document: any;
    @Injectable()
    export class EventsYandex implements IEventMap {

        listenEvent<E>(objMap: any, eventName: string): Observable<E> {
            return new Observable((observer: Observer<E>) => {
                objMap.addListener(eventName, (arg: E) => { observer.next(arg); });
            });
        }

        idle(map: any) {
        }

        zoomend(map: any, callback: () => void) {
            this.listenEvent<void>(map, "idle").subscribe(() => {
                let bounds = map.getBounds();
                console.log(bounds, 'IDLE')
                if (bounds) {
                    callback();
                }


            })
        }

        dragend(map: any, callback: () => void) {
            this.listenEvent<void>(map, "idle").subscribe(() => {
                let bounds = map.getBounds();
                console.log(bounds, 'IDLE')
                if (bounds) {
                    callback();
                }


            })
        }


        boundsChange(map: any) {
        }
        zoomChange(map: any) {

        }
        clickMap(map: any) {

        }
    }
}
