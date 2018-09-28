import { AbstractEvent } from "../../abstract/abstract-event";
import { GoogleMap } from "./map";
import { Observable, Observer } from "rxjs";

export class GoogleEvent extends AbstractEvent {

    listen<E>(map: GoogleMap, eventName: string): Observable<E> {
        return new Observable((observer: Observer<E>) => {
          //  map.addListener(eventName, (arg: E) => { observer.next(arg); });
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