import { LoadApiMap, InitMap } from "../../interface/i-init";
import * as mapstyle from "../../class/google/maps.style.json";
import * as MarkerClusterer from '@google/markerclustererplus';
declare var document: any;
declare var L: any;
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
                    console.log('script load');
                    resolve({ loaded: true, status: 'Loaded' });
                };
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
        var coords = { lat: 27.215556209029693, lng: 18.45703125 };
        let map = L.map(id, {
            zoom: 3,
            center: coords,
            editable: true,
            doubleClickZoom: false,
            minZoom: 3,
            zoomControl: false,
        });


        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        objMap = map;
        return { map };



    }

    destroyMap() {
        let ds = document.getElementById('mapAPI');
        if (ds != null) {
            ds.remove();
        }
        console.log('leaflet destroy')
        document.getElementById('map').innerHTML = "";
        objMap.remove();
        L = null;


    }
}
