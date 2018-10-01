import { ILoadApiMap, IInitMap } from "../../interface/i-init";
import { Injectable } from '@angular/core';
import * as MarkerClusterer from '@google/markerclustererplus';
import { Observable, Observer } from "rxjs";
import { LoadStatus } from "../../enum/e-loadstatus";
import { MapOptions } from "../../interface/google/i-inner";
import { ReadyState } from "../../enum/e-readyState"

export namespace Google {
    declare var document: any;
    declare var google: any;

    @Injectable()
    export class Initialize implements IInitMap {

        source: ILoadApiMap;

        public loadScriptMap(source: ILoadApiMap): Observable<LoadStatus> {
            return new Observable((observer: Observer<LoadStatus>) => {
                let url: string;
                let script = document.createElement('script');
                this.source = source;
                script.type = 'text/javascript';
                url = source.src + '&key=' + source.key + '&language=' + source.language
                script.src = url;
                script.id = 'mapAPI';
                if (script.readyState) {
                    script.onreadystatechange = () => {
                        if (script.readyState === ReadyState.loaded || script.readyState === ReadyState.complete) {
                            script.onreadystatechange = null;
                            observer.next(LoadStatus.loaded);
                        }
                    };
                } else {
                    script.onload = () => {

                    };

                    window['APILoaded'] = (ev) => {
                        observer.next(LoadStatus.loaded);
                    }
                }
                script.onerror = (error: any) => {
                    observer.next(LoadStatus.error);
                };
                document.getElementsByTagName('head')[0].appendChild(script);

            });

        }

        initializingMap(id: string): any {
            return new google.maps.Map(document.getElementById(id), {
                center: new google.maps.LatLng(27.215556209029693, 18.45703125),
                zoom: 4,
                disableDefaultUI: true,
                minZoom: 3,
                scaleControl: true,
                draggableCursor: 'default',
                disableDoubleClickZoom: true,
            });
        }

        destroyMap() {
            google = null;
            let ds = document.getElementById('mapAPI');
            if (ds != null) {
                ds.remove();
            }

            var style = document.querySelectorAll('style')
            for (let i = 0; i < style.length; i++) {
                let remove = false;
                if (style[i].innerHTML.indexOf(".gm-style") != -1) { remove = true; }
                if (remove) { style[i].parentNode.removeChild(style[i]) };

            }
            let scripts = document.querySelectorAll("script[src*='maps.googleapis.com']");
            for (var i = 0; i < scripts.length; i++) {
                scripts[i].parentNode.removeChild(scripts[i]);
            }
            document.getElementById('map').innerHTML = "";
        }
    }
}
