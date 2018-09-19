import { Injectable } from "@angular/core";
import { Observable, Observer, config } from 'rxjs';
import { IEventMap } from "../../interface/i-event";

export namespace Map.Leaflet {
declare var require: any;
declare var placeId: any;
declare var event: any;
declare var document: any;
declare var google: any;
declare var addListener: any;
@Injectable()
export class EventsLeaflet implements IEventMap {

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
                console.log(bounds,'IDLE')
            if (bounds) {
                callback();             
            }


        })
    }

    dragend(map: any, callback: () => void) {
        this.listenEvent<void>(map, "idle").subscribe(() => {
            let bounds = map.getBounds();
                console.log(bounds,'IDLE')
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
