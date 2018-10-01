import { AbstractEvent } from "../../abstract/abstract-event";
import { GoogleMap } from "./map";
import { Observable, Observer } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class GoogleEvent extends AbstractEvent {

    listen<E>(eventName: string): Observable<E> {
        return new Observable((observer: Observer<E>) => {
            this.map.api.addListener(eventName, (arg: E) => { observer.next(arg); });
        });
    }

    idle(): void {
        throw new Error("Method not implemented.");
    }

    mapClicked(): void {
        throw new Error("Method not implemented.");
    }

    zoomFinished(): void {
        throw new Error("Method not implemented.");
    }

    dragFinished(): void {
        throw new Error("Method not implemented.");
    }

    boundsChanged(): void {
        throw new Error("Method not implemented.");
    }

    zoomChanged(): void {
        throw new Error("Method not implemented.");
    }
}