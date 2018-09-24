import { ILoadApiMap, IInitMap } from "../../interface/i-init";
import * as mapstyle from "../../class/google/maps.style.json";
import 'leaflet';
import 'leaflet-css';
import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { LoadStatus } from "../../enum/e-loadstatus";

export namespace Map.Leaflet {
    declare var document: any;
    declare var L: any;
    var map: any;

    @Injectable()
    export class InitializeLeaflet implements IInitMap {
        source: ILoadApiMap;
        public loadScriptMap(source: ILoadApiMap): Observable<LoadStatus> {
            return new Observable((observer: Observer<LoadStatus>) => {
                this.source = source;
                observer.next(LoadStatus.loaded);
            });
        }

        initializingMap(id: string): any {
            try {
                map = L.map(id, {
                    zoom: 3,
                    center: { lat: 27.215556209029693, lng: 18.45703125 },
                    editable: true,
                    doubleClickZoom: false,
                    minZoom: 3,
                    zoomControl: false,
                });

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                return map;
            }
            catch (error) {
                console.log(error);
            }
        }

        destroyMap(): void {
            try {
                let ds = document.getElementById('mapAPI');
                if (ds != null) {
                    ds.remove();
                }
                console.log('leaflet destroy')
                document.getElementById('map').innerHTML = "";
                if (map != null && map != undefined) {
                    map.remove();
                }

            }
            catch (error) {
                console.log(error);
            }
        }
    }
}
