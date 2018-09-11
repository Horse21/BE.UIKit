import { LoadApiMap, InitMap } from "../../interface/i-init";
import * as mapstyle from "../../class/google/maps.style.json";
import * as MarkerClusterer from '@google/markerclustererplus';
declare var document: any;
declare var BMap: any;
declare var require: any;
var objMap;

export class Initialize implements InitMap {

    source: LoadApiMap;
    public loadScriptMap(source: LoadApiMap): Promise<any> {
        return new Promise((resolve, reject) => {
            this.source = source;
            let script = document.createElement('script');
            script.type = 'text/javascript';
            let url: string;
            url = source.src;
            script.id = 'mapAPI';
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
            let ds = document.getElementById('mapAPI');
            if (ds != null) {
                ds.remove();
            }
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
            objMap = map;
            return { map }
        }
    }

    destroyMap() {
        let ds = document.getElementById('mapAPI');
        if (ds != null) {
            ds.remove();
        }

        let scripts = document.querySelectorAll("script[src*='api.map.baidu']");
        for (var i = 0; i < scripts.length; i++) {
            scripts[i].parentNode.removeChild(scripts[i]);
        }
        console.log('destroy baidu');
        objMap.reset();
        document.getElementById('map').innerHTML = "";
        BMap = null;
    }
}
