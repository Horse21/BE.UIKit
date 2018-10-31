import { IMapOptions } from '../interfaces/i-map-options';
import { GeoContainer } from '../entity/geo-container';
import { AbstractConfig } from './abstract-config';
import { FetchStatus } from '../enum/e-fetch-status';
import { IApiSettings } from '../interfaces/i-api-settings';
import { Observable } from 'rxjs';
import { AbstractEvent } from './abstract-event';
import { Injectable } from '@angular/core';
import { AbstractMarkerCluster } from './abstract-marker-cluster';
import { AbstractSearch } from './abstract-search';
import { AbstractRouteBuilder } from './abstract-route-builder';
import { BaseMarker } from '../entity/base-marker';
import { BaseLayer } from '../entity/base-layer';
import { EventEmitter } from 'events';

@Injectable()
export abstract class AbstractMap {
    /**
     * Map-specific API object;
     */
    api: any;
    /**
     * allow to load markers dynamically;
     */
    loadMarkers: boolean = true;
    /**
     * enable/disable the click event on the map;
     */
    clickMap: boolean = false;
     /**
     * the object selected marker;
     */
    selectedMarker: BaseMarker;
    /**
     * show/hide the public transport layer on the map;
     */
    transitLayer: BaseLayer;
     /**
     * show/hide the traffic layer on the map;
     */
    trafficLayer: BaseLayer;
     /**
     * List of subscriptions to map events;
     */
    callbackMap: EventEmitter = new EventEmitter();

    public get container(): HTMLElement {
        return document.getElementById('map');
    };

    public abstract get styleSelector(): string;

    public abstract get scriptSelector(): string;

    constructor(public options: IMapOptions,
        public config: AbstractConfig,
        public events: AbstractEvent,
        public cluster: AbstractMarkerCluster,
        public geo: GeoContainer,
        public search: AbstractSearch,
        public route: AbstractRouteBuilder) {

        this.events.initMap(this);
        this.cluster.initMap(this);
        this.config.initMap(this);
        this.search.initMap(this);
        this.route.initMap(this);

    }

    /**
     * It is necessary in the api object to initialize an instance of the api of a specific map.
     */
    public abstract init(): void;

    public abstract onDataFetched(settings: IApiSettings): Observable<FetchStatus>;

    public setZoom(zoom: number): void {
        this.options.zoom = zoom;
    }

    public destroy(): void {
        this.removeCurrentMapScriptContainer();
        this.clearCurrentMapStyles();
        this.clearCurrentMapScripts();
        this.container.innerHTML = "";
    }

    private removeCurrentMapScriptContainer(): void {
        let apiScript = document.getElementById('mapAPI');
        if (apiScript) {
            apiScript.remove();
        }
    }

    private clearCurrentMapStyles(): void {
        Array.from(document.querySelectorAll('style'))
            .forEach(style => {
                let isMapStyle = style.innerHTML.indexOf(this.styleSelector) > -1;
                if (isMapStyle) {
                    style.remove();
                }
            });
    }

    private clearCurrentMapScripts(): void {
        Array.from(document.querySelectorAll(this.scriptSelector))
            .forEach(script => {
                script.remove();
            });
    }
}