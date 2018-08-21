import { LoadApiMap,InitMap } from "../../interface/interface-init";
import * as mapstyle from "../../class/google/maps.style.json";
declare var document: any;
declare var google: any;
export class Initialize implements InitMap {
 
    source: LoadApiMap;
    public Init(source: LoadApiMap): Promise<any> {
        return new Promise((resolve, reject) => {
            this.source = source;
            let script = document.createElement('script');
            script.type = 'text/javascript';
            let url: string;
            url = source.src + '&key=' + source.key + '&v=' + source.version + '&language=' + source.language
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
                    resolve({ loaded: true, status: 'Loaded' });
                };
            }
            script.onerror = (error: any) => {
                reject({ loaded: false, status: 'Error' });
            };
            document.getElementsByTagName('head')[0].appendChild(script);
        });
    }


    Load(): any {
        let map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(55.753215, 37.622504),
            zoom: 12,
            disableDefaultUI: true,
            minZoom: 3,
            scaleControl: true,
            draggableCursor: 'default',
            disableDoubleClickZoom: true,
            styles: mapstyle.default
        });

        let traffic = new google.maps.TrafficLayer();
        let transit = new google.maps.TransitLayer();
        let geocoder = new google.maps.Geocoder();
        let placesService = new google.maps.places.PlacesService(map);
        return { map: map, traffic: traffic, transit: transit, geocoder: geocoder, placesService: placesService }
    }

    Destroy() {
        
    }
}
