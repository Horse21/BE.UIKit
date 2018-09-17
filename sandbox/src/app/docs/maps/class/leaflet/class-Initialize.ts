import { LoadApiMap, InitMap } from "../../interface/i-init";
import * as mapstyle from "../../class/google/maps.style.json";
import 'leaflet';
import 'leaflet.markercluster';
import * as mark from "../../test.markers.json";
import { LeafletMap } from "../../interface/leaflet/i-inner";
declare var document: any;
declare var L: any;
declare var require: any;
var objMap:any;

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

                var styles = document.createElement('link');
                styles.rel = 'stylesheet';
                styles.id = 'mapAPI';
                styles.type = 'text/css';
                styles.href = 'https://unpkg.com/leaflet@1.3.4/dist/leaflet.css';
                document.getElementsByTagName('head')[0].appendChild(styles);

                resolve({ loaded: true, status: 'Loaded' });

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
               // document.getElementsByTagName('head')[0].appendChild(script);
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    initializingMap(id: string): any {     
        try {

            
            var coords = { lat: 27.215556209029693, lng: 18.45703125 };
            objMap = L.map(id, {
                zoom: 3,
                center: coords,
                editable: true,
                doubleClickZoom: false,
                minZoom: 3,
                zoomControl: false,
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(objMap);  
            
            let markers: any[];
            markers = mark.default;
            let icon = L.icon({
                iconUrl: require('../../images/icon/icon_hotel.png'),
            });
            let markerCluster = L.markerClusterGroup({
                chunkedLoading: false,
                maxClusterRadius: 120,
                iconCreateFunction: function (cluster) {
                    var markers = cluster.getAllChildMarkers();
                    var html = '<div class="markerClusLeaftlet">' + markers.length + '</div>';
                    return L.divIcon({ html: html, className: 'mycluster', iconSize: L.point(44, 44) });
                },
            }); 
            var ma = [];
            for (let i = 0; i < mark.default.length; i++) {
                let item = markers[i];
                var obj = new L.marker([item.Address.Lat, item.Address.Lng], {
                    position: { lat: item.Address.Lat, lng: item.Address.Lng },
                    draggable: false,
                    clickable: true,
                    zIndex: 9999,
                    icon: icon,
                    title: item.Hotelname
                });

                ma.push(obj);
                markerCluster.addLayer(obj);
            }
          
            objMap.addLayer(markerCluster);
                       
           

            return { objMap };
        }
        catch (error) {
            console.log(error);
        }
    }

    destroyMap() {
        try {
            let ds = document.getElementById('mapAPI');
            if (ds != null) {
                ds.remove();
            }
            console.log('leaflet destroy')
            document.getElementById('map').innerHTML = "";
            if (objMap != null && objMap != undefined) {
                objMap.remove();           
            }
           
        }
        catch (error) {
            console.log(error);
        }
    }
}
