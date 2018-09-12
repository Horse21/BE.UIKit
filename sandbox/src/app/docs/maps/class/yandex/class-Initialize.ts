import { LoadApiMap, InitMap } from "../../interface/i-init";
import * as mapstyle from "../../class/google/maps.style.json";
import * as MarkerClusterer from '@google/markerclustererplus';
import { ObjectMap } from "../class-objmap";
declare var document: any;
declare var ymaps: any;
declare var require: any;
var objMap: any;

export class Initialize implements InitMap {
    source: LoadApiMap;
    public loadScriptMap(source: LoadApiMap): Promise<any> {
        try {
            return new Promise((resolve, reject) => {
                this.source = source;
                let script = document.createElement('script');
                script.type = 'text/javascript';
                let url: string;
                url = source.src;
                script.src = url;
                script.id = 'mapAPI';
                if (script.readyState) {
                    script.onreadystatechange = () => {
                        if (script.readyState === "loaded" || script.readyState === "complete") {
                            script.onreadystatechange = null;
                            resolve({ loaded: true, status: 'Loaded' });
                        }
                    };
                } else {
                    script.onload = () => {
                    };
                    window['APILoaded'] = (ev) => {
                        console.log('yandex maps api loaded');
                        resolve({ loaded: true, status: 'Loaded' });
                    }
                }
                script.onerror = (error: any) => {
                    reject({ loaded: false, status: 'Error' });
                };
                document.getElementsByTagName('head')[0].appendChild(script);
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    initializingMap(id: string): any {
        try {
          //  ymaps.ready().then(() => {
                objMap = new ymaps.Map(id, {
                    center: [27.215556209029693, 18.45703125],
                    behaviors: ['default', 'scrollZoom'],
                    zoom: 3,
                    controls: []

                });
                objMap.options.set('minZoom', 3);
                objMap.options.set('maxZoom', 22);
                return { objMap };
           // });
        }
        catch (error) {
            console.log(error);
        }
    }

    destroyMap() {
        try {
            ymaps = null;
            let apiScript = document.getElementById('mapAPI');
            if (apiScript != null && apiScript != undefined) {
                apiScript.remove();
            }
            var style = document.querySelectorAll('style[data-ymaps]');
            for (let i = 0; i < style.length; i++) {
                style[i].parentNode.removeChild(style[i])

            }
            console.log('yandex destroy')
            if (objMap != null && objMap != undefined) {
                objMap.destroy();
            }
            document.getElementById('map').innerHTML = "";
        }
        catch (error) {
            console.log(error);
        }
    }
}
