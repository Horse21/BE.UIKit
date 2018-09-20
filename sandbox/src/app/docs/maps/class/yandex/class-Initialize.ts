import { ILoadApiMap, IInitMap } from "../../interface/i-init";
import * as  ObjectMap from "../class-objmap";
import * as mark from "../../test.markers.json";
import { Injectable } from "@angular/core";

export namespace Map.Yandex {
    declare var document: any;
    declare var ymaps: any;
    var map: any;

    @Injectable()
    export class InitializeYandex implements IInitMap {
        source: ILoadApiMap;
        public loadScriptMap(source: ILoadApiMap): Promise<any> {
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
                map = new ymaps.Map(id, {
                    center: [27.215556209029693, 18.45703125],
                    behaviors: ['default', 'scrollZoom'],
                    zoom: 3,
                    controls: []

                });
                map.options.set('minZoom', 3);
                map.options.set('maxZoom', 22);          
                return map;
            }
            catch (error) {
                console.log(error);
            }            
        }

        destroyMap(): void {
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
                if (map != null && map != undefined) {
                    map.destroy();
                }
                document.getElementById('map').innerHTML = "";
            }
            catch (error) {
                console.log(error);
            }
        }
    }
}
