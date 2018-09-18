import { Injectable } from "@angular/core";
import { Observable, Observer, config } from 'rxjs';
import { IEventMap } from "../../interface/i-event";
import { Manager } from "../class-imap-manager";
declare var require: any;
declare var placeId: any;
declare var event: any;
declare var document: any;
declare var google: any;
declare var addListener: any;
@Injectable()
export class EventsGoogle implements IEventMap {

    listenEvent<E>(objMap: any, eventName: string): Observable<E> {
        return new Observable((observer: Observer<E>) => {
            objMap.addListener(eventName, (arg: E) => { observer.next(arg); });
        });
    }

    idle(map: any, callback: () => void) {
        this.listenEvent<void>(map, "idle").subscribe(() => {
            let bounds = map.getBounds();
                console.log(bounds,'IDLE')
            if (bounds) {
                callback();             
            }


        })
    }

    boundsChange(map: any) {
        this.listenEvent<void>(map, "bounds_changed").subscribe(() => {
            
        })
    }

    zoomChange(map: any) {
        this.listenEvent<void>(map, "zoom_changed").subscribe(() => {
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
