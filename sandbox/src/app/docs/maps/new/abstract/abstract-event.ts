import {AbstractMap} from '../abstract/abstract-map';
import { Observable } from 'rxjs';

export abstract class AbstractEvent {
    

    map: AbstractMap;

    abstract listen<E>(map: AbstractMap, eventName: string): Observable<E>;

    abstract idle(onIdle: () => void): void;

    abstract mapClicked(onMapClicked: () => void): void;

    abstract zoomFinished(onZoomFinished: () => void): void;

    abstract dragFinished(onDragFinished: () => void): void;

    abstract boundsChanged(onBoundsChanged: () => void): void;

    abstract zoomChanged(onZoomChanged: () => void): void;
    
}