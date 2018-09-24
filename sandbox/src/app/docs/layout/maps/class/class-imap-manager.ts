import { MapManager, MapType } from "../interface/i-map-manager";
import { Injectable } from '@angular/core';
import { Google } from '../class/google/class-main';
import * as YandexMap from '../class/yandex/class-main';
import * as BaiduMap from "../class/baidu/class-main";
import * as LeafletMap from "../class/leaflet/class-main";
import { IMainMap } from '../interface/i-main';
import * as data from "../maps.const.json";
import { ILoadApiMap } from "../interface/i-init";
import * as ObjectMap from "./class-objmap";
import { LoadStatus } from "../enum/e-loadstatus";

export namespace Map {
    @Injectable()
    export class Manager implements MapManager {
        mapType: MapType;
        hashtable: { [name: string]: IMainMap; } = {};

        constructor(private objectMap: ObjectMap.Map.ObjectMap,
            private google: Google.Map,
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
            .subscribe(data => {
                if (data == LoadStatus.loaded) {
                    this.objectMap.map = source.init.initializingMap(id);
                    source.events.clickMap(source.config.getAddress.bind(this));
                    source.events.boundsChange(source.config.setMarkers.bind(this));
                    source.events.idle(source.config.setMarkers.bind(this));
                    source.events.dragend(source.config.setMarkers.bind(this));
                    source.events.zoomend(source.config.setMarkers.bind(this));
                    source.events.zoomChange(source.config.setMarkers.bind(this));
                }
            })    
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