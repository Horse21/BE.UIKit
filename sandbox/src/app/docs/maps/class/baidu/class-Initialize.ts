import { LoadApiMap, InitMap } from "../../interface/i-init";
import * as mapstyle from "../../class/google/maps.style.json";
import * as MarkerClusterer from '@google/markerclustererplus';
declare var document: any;
declare var BMap: any;
declare var require: any;

export class Initialize implements InitMap {

    source: LoadApiMap;
    public loadScriptMap(source: LoadApiMap): Promise<any> {
        return new Promise((resolve, reject) => {
            this.source = source;
            let script = document.createElement('script');
            script.type = 'text/javascript';
            let url: string;
            url = source.src;
            script.src = url;
            if (script.readyState) {
                script.onreadystatechange = () => {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        resolve({ loaded: true, status: 'Loaded' });
                    }
                };
            } else {
                script.onload = () => {
                    // resolve({ loaded: true, status: 'Loaded' });
                    console.log('script load');
                };
                window['APILoaded'] = (ev) => {
                    console.log('baidu maps api loaded');
                    //resolve(window['google']['maps']);
                    resolve({ loaded: true, status: 'Loaded' });
                }
            }
            script.onerror = (error: any) => {
                reject({ loaded: false, status: 'Error' });
            };
            document.getElementsByTagName('head')[0].appendChild(script);
        });
    }

    initializingMap(id: string): any {
        if (typeof BMap !== "undefined") {
            let map = new BMap.Map(id, {
                minZoom: 3,
                enableMapClick: true,
                enableAutoResize: false
            });

            map.centerAndZoom(new BMap.Point(18.45703125, 27.215556209029693), 4);
            map.enableScrollWheelZoom(true);
            map.disableDoubleClickZoom(false);
            map.setDefaultCursor('');


            return { map }
        }
    }

    destroyMap() {

    }
}
