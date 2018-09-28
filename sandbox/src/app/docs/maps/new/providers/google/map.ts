import { AbstractMap } from "../../abstract/abstract-map";
import { IMapOptions } from "../../interfaces/i-map-options";
import { FetchStatus } from "../../enum/e-fetch-status";
import { Observable, Observer } from "rxjs";
import { IApiSettings } from "../../interfaces/i-api-settings";
import { GoogleMapOptions } from "./entity/GoogleMapOptions";
import { Injectable } from "@angular/core";

declare var google;
declare var document;

@Injectable()
export class GoogleMap extends AbstractMap {
   
   apiSettings: IApiSettings;
   googleMap: AbstractMap;
    
   constructor(container: HTMLElement, mapOptions: GoogleMapOptions) {
       super(container, mapOptions);
       this.init();
   }

    init(): AbstractMap {
      return this.googleMap = new google.maps.Map(this.container, this.options);
    }

    destroy(): void {
        google = null;

        let apiScript = document.getElementById('mapAPI');
        let mapContainer = document.getElementById('map');

        if (apiScript) apiScript.remove();

        let styles = document.querySelectorAll('style');
        styles.forEach(style => {
            let isGoogleMapStyle = style.innerHTML.indexOf(".gm-style") > -1;
            if (isGoogleMapStyle) style.remove();
        });

        let scripts = document.querySelectorAll("script[src*='maps.googleapis.com']");
        scripts.forEach(script => {
            script.remove();
        });

        mapContainer.innerHTML = "";
    }

    onDataFetched(status: FetchStatus): Observable<FetchStatus> {
        return new Observable((observer: Observer<FetchStatus>) => {
            let apiScript = document.createElement('script');
            let headElement = document.getElementsByTagName('head')[0];

            apiScript.type = 'text/javascript';

            let apiUrl: string;
            apiUrl = `${this.apiSettings.url}&key=${this.apiSettings.key}&language=${this.apiSettings.language}`;

            apiScript.src = apiUrl;
            apiScript.id = 'mapAPI';

            if (apiScript.readyState) {
                apiScript.onreadystatechange = () => {
                    if (apiScript.readyState === "loaded" || apiScript.readyState === "complete") {
                        apiScript.onreadystatechange = null;
                        observer.next(FetchStatus.SUCCESS);
                    }
                };
            } else {
                window['APILoaded'] = () => {
                    console.log('GoogleMap.fetchData.APILoaded', FetchStatus.SUCCESS);
                    observer.next(FetchStatus.SUCCESS);
                }
            }
            apiScript.onerror = (error) => {
                console.log('GoogleMap.fetchData.APIError', error);
                observer.next(FetchStatus.ERROR);
            };

            headElement.appendChild(apiScript);

        });
    }

}
