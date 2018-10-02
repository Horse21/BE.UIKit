import { AbstractEvent } from "../../abstract/abstract-event";
import { Observable, Observer } from "rxjs";
import { Injectable } from "@angular/core";
import { IEventClikMap } from "./interfaces/i-event-clik-map";

@Injectable()
export class GoogleEvent extends AbstractEvent {
    constructor() {
        super();
    }

    listen<E>(eventName: string): Observable<E> {
        return new Observable((observer: Observer<E>) => {
            this.map.api.addListener(eventName, (arg: E) => { observer.next(arg); });
        });
    }

    idle(callback: () => void) {
        this.listen<void>("idle").subscribe(() => {
            let bounds = this.map.api.getBounds();
            if (bounds) {
                callback();
            }
        })
    }

    mapClicked(callback: (event) => void) {
        this.listen<IEventClikMap>("click").subscribe((event) => {
            callback(event);
        })
    }

    zoomFinished(): void {

    }

    dragFinished(): void {

    }

    boundsChanged(): void {

    }

    zoomChanged(): void {

    }
}