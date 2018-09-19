import { Injectable } from "@angular/core";
import { Observable, Observer, config } from 'rxjs';
import { IEventMap } from "../../interface/i-event";

export namespace Map.Baidu {
    declare var google: any;
    declare var addListener: any;
    declare var require: any;
    declare var placeId: any;
    declare var event: any;
    declare var document: any;

    @Injectable()
    export class EventsBaidu implements IEventMap {
        listenEvent<E>(objMap: any, eventName: string): Observable<E> {
            return new Observable((observer: Observer<E>) => {
                objMap.addEventListener(eventName, (arg: E) => { observer.next(arg); });
            });
        }
    
        idle(map: any, callback: () => void) {
           
        }
    
        zoomend(map: any, callback: () => void) {
           
        }
    
        dragend(map: any, callback: () => void) {
            this.listenEvent<void>(map, "dragend").subscribe(() => {
                let bounds = map.getBounds();
                    console.log(bounds,'dragend')
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
}
