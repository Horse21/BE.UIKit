import { MapManager, MapType } from "../interface/i-map-manager";
import { Injectable } from '@angular/core';
import * as GoogleMap from '../class/google/class-main';
import * as YandexMap from '../class/yandex/class-main';
import * as BaiduMap from "../class/baidu/class-main";
import * as LeafletMap from "../class/leaflet/class-main";
import { IMainMap } from '../interface/i-main';
import * as data from "../maps.const.json";
import { ILoadApiMap } from "../interface/i-init";
import * as ObjectMap from "./class-objmap";

export namespace Map {
    @Injectable()
    export class Manager implements MapManager {
        mapType: MapType;
        hashtable: { [name: string]: IMainMap; } = {};

        constructor(private objectMap: ObjectMap.Map.ObjectMap,
            private google: GoogleMap.Map.Google.GoogleMap,
            private yandex: YandexMap.Map.Yandex.YandexMap,
            private baidu: BaiduMap.Map.Baidu.BaiduMap,
            private leaflet: LeafletMap.Map.Leaflet.LeafletMap
            ) {
            this.hashtable[MapType[MapType.google]] = google;
            this.hashtable[MapType[MapType.yandex]] = yandex;
            this.hashtable[MapType[MapType.baidu]] = baidu;
            this.hashtable[MapType[MapType.leaflet]] = leaflet;
            this.mapType = MapType.google;
        }

        registrationMap(mapType: MapType, id: string): MapManager {
            this.destroy();
            this.mapType = mapType;
            this.load(id);
            return this;
        }

        private load(id: string) {
            let dt: ILoadApiMap = data['InitList'][MapType[this.mapType]];
            let source = this.hashtable[MapType[this.mapType]];
            source.init.loadScriptMap(dt)
                .then(data => {
                    if (data.status === 'Loaded') {
                        let load = source.init.initializingMap(id);
                        this.objectMap.map = load.objMap;
                        source.events.clickMap(this.objectMap.map);
                        source.events.boundsChange(this.objectMap.map);
                        source.events.idle(this.objectMap.map, source.config.setMarkers.bind(this));
                        source.events.dragend(this.objectMap.map, source.config.setMarkers.bind(this));
                        source.events.zoomend(this.objectMap.map, source.config.setMarkers.bind(this));
                        source.events.zoomChange(this.objectMap.map);

                    }
                }).catch(error => console.log(error));

        }

        private destroy() {
            try {
                let source = this.hashtable[MapType[this.mapType]]
                source.init.destroyMap();
            }
            catch{ }
        }

        getActiveMap(): IMainMap {
            return this.hashtable[MapType[this.mapType]];
        }
    }
}