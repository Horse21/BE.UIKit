import { ILoadApiMap, IInitMap } from "../../interface/i-init";
import * as MarkerClusterer from 'bmaplib.markerclusterer';
import * as mark from "../../test.markers.json";
import { Injectable } from "@angular/core";
declare var BMapLib: any;
export namespace Map.Baidu {
    declare var document: any;
    declare var BMap: any;
    declare var BMapLib: any;
    let map: any;

    @Injectable()
    export class InitializeBaidu implements IInitMap {
        source: ILoadApiMap;
        public loadScriptMap(source: ILoadApiMap): Promise<any> {
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
                map = new BMap.Map(id, {
                    minZoom: 3,
                    enableMapClick: true,
                    enableAutoResize: false
                });
                map.centerAndZoom(new BMap.Point(18.45703125, 27.215556209029693), 4);
                map.enableScrollWheelZoom(true);
                map.disableDoubleClickZoom(false);
                map.setDefaultCursor('');
                return map;
            }
        }

        destroyMap() {
            let ds = document.getElementById('mapAPI');
            if (ds != null) {
                ds.remove();
            }

            let scripts = document.querySelectorAll("script[src*='api.map.baidu']");
            for (let i = 0; i < scripts.length; i++) {
                scripts[i].parentNode.removeChild(scripts[i]);
            }

            var style = document.querySelectorAll('style')
            for (let i = 0; i < style.length; i++) {
                let remove = false;
                if (style[i].innerHTML.indexOf(".BMap_mask") != -1) { remove = true; }
                if (remove) { style[i].parentNode.removeChild(style[i]) };

            }
            map.reset();
            document.getElementById('map').innerHTML = "";
            BMap = null;
        }
    }
}
