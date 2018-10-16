import { AbstractMap } from "../../abstract/abstract-map";
import { IMapOptions } from "../../interfaces/i-map-options";
import { FetchStatus } from "../../enum/e-fetch-status";
import { Observable, Observer } from "rxjs";
import { IApiSettings } from "../../interfaces/i-api-settings";
import { BaiduMapOptions } from "./entity/baidu-map-options";
import { Injectable } from "@angular/core";
import { BaiduEvent } from "./event";
import { BaiduConfig } from "./config";
import { ReadyStateScript } from "../../enum/e-ready-state-script";
import { AbstractMarkerCluster } from "../../abstract/abstract-marker-cluster";
import { BaiduMarkerCluster } from "./cluster";
import { GeoContainer } from "../../entity/geo-container";
import { BaiduSearchMap } from "./search";
import { BaiduRouteBuilder } from "./route";

declare var google;
declare var document;

@Injectable()
export class BaiduMap extends AbstractMap {
    public get scriptSelector(): string {
        return "script[src*='maps.googleapis.com']";
    };

    public get styleSelector(): string {
        return ".gm-style";
    }

    constructor(mapOptions: BaiduMapOptions, config: BaiduConfig, events: BaiduEvent, cluster: BaiduMarkerCluster, geo: GeoContainer, search: BaiduSearchMap, route: BaiduRouteBuilder) {
        super(mapOptions, config, events, cluster, geo, search, route);

    }

    init(): void {

     this.api = new google.maps.Map(this.container, this.options);
    }

    onDataFetched(settings: IApiSettings): Observable<FetchStatus> {
      
        return new Observable((observer: Observer<FetchStatus>) => {

            let apiScript = document.createElement('script');
            let headElement = document.getElementsByTagName('head')[0];
            let apiUrl: string;
            apiScript.type = 'text/javascript';
            apiUrl = settings.url + '&key=' + settings.key + '&language=' + settings.language;
            apiScript.src = apiUrl;
            apiScript.id = 'mapAPI';

            if (apiScript.readyState) {
                apiScript.onreadystatechange = () => {
                    if (apiScript.readyState === ReadyStateScript.loaded || apiScript.readyState === ReadyStateScript.complete) {
                        apiScript.onreadystatechange = null;
                    }
                };
            } else {
                window['APILoaded'] = () => {
                  //  this.setCenter();
                    observer.next(FetchStatus.SUCCESS);
                }
            }
            apiScript.onerror = (error) => {
                observer.next(FetchStatus.ERROR);
            };

            headElement.appendChild(apiScript);

        });
    }

    private setCenter(): void {
        this.options.center = new google.maps.LatLng(27.215556209029693, 18.45703125);
    }

    public OnReady(latitude: number, longitude: number){
        this.options.center = new google.maps.LatLng(latitude, longitude);
    }

    destroy(): void {
        super.destroy();
        google = null;

    }

}
