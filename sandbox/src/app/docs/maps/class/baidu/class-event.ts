import { Injectable } from "@angular/core";
import { Observable, Observer, config } from 'rxjs';
import { IEventMap } from "../../interface/i-event";
declare var require: any;
declare var placeId: any;
declare var event: any;
declare var document: any;
declare var google: any;
declare var addListener: any;
@Injectable()
export class EventsBaidu implements IEventMap {
    listenEvent<E>(map: any, eventName: string): Observable<E> {
        return new Observable((observer: Observer<E>) => {
            map.addListener(eventName, (arg: E) => { observer.next(arg); });
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
