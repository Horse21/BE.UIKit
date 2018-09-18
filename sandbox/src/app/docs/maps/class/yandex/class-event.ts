import { Injectable } from "@angular/core";
import { Observable, Observer, config } from 'rxjs';
import { IEventMap } from "../../interface/i-event";
import { ObjectMap } from "../class-objmap";
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

    boundsChange(map: any) {
    }
    zoomChange(map: any) {

    }
    clickMap(map: any) {

    }
}
