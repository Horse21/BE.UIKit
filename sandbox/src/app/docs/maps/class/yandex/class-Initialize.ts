import { LoadApiMap,InitMap } from "../../interface/i-init";
import * as mapstyle from "../../class/google/maps.style.json";
import * as MarkerClusterer from '@google/markerclustererplus';
declare var document: any;
declare var ymaps: any;
declare var require: any;

export class Initialize implements InitMap {
 
    source: LoadApiMap;
    public loadScriptMap(source: LoadApiMap): Promise<any> {
        return new Promise((resolve, reject) => {
            this.source = source;
            console.log( this.source,'loadScriptMapYandex')
            let script = document.createElement('script');
            script.type = 'text/javascript';
            let url: string;
            url = source.src;
            script.src = url;
            console.log('URL',url)
            if (script.readyState) {
                script.onreadystatechange = () => {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        resolve({ loaded: true, status: 'Loaded' });
                    }
                };
            } else {
                script.onload = () => {
                    console.log('scriptonload Yandex')
                 //   resolve({ loaded: true, status: 'Loaded' });
                };
                window['APILoaded'] = (ev) => {
                    console.log('yandex maps api loaded');
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

    initializingMap(id:string): any {
        ymaps.ready().then(() => {
            let map = new ymaps.Map(id, {
                center: [27.215556209029693, 18.45703125],
                behaviors: ['default', 'scrollZoom'],
                zoom: 3,
                controls: []
                
            });
           return {map} ;
          });
}

    destroyMap() {
        
    }
}
