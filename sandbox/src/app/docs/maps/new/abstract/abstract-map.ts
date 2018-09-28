import { IMapOptions } from '../interfaces/i-map-options';
import { GeoContainer } from '../entity/geo-container';
import { AbstractConfig } from './abstract-config';
import { FetchStatus } from '../enum/e-fetch-status';
import { IMap } from '../interfaces/i-map';
import { IApiSettings } from '../interfaces/i-api-settings';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";

export abstract class AbstractMap {

    source: IApiSettings;
    instance: AbstractMap;

    container: HTMLElement;
    options: IMapOptions;
    config: AbstractConfig;
    geo: GeoContainer;

    constructor(container: HTMLElement, mapOptions: IMapOptions) {
        this.container = container;
        this.options = mapOptions;
        
    }

    abstract init(container: HTMLElement): AbstractMap;
    abstract destroy(): void;
    abstract onDataFetched(status: FetchStatus): Observable<FetchStatus>;

    setZoom(zoom: number): void {
        this.options.zoom = zoom;
    }

}