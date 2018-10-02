import { AbstractMap } from '../abstract/abstract-map';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IInitMap } from '../interfaces/i-init-map';

@Injectable()
export abstract class AbstractEvent implements IInitMap {
    
    map: AbstractMap;

    protected abstract listen<E>(eventName: string): Observable<E>;

    abstract idle(onIdle: () => void): void;

    abstract mapClicked(onMapClicked: () => void): void;

    abstract zoomFinished(onZoomFinished: () => void): void;

    abstract dragFinished(onDragFinished: () => void): void;

    abstract boundsChanged(onBoundsChanged: () => void): void;

    abstract zoomChanged(onZoomChanged: () => void): void;

    initMap(map: AbstractMap): void {
        this.map = map;
    }
}