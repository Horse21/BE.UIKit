import { MapManager, MapType } from "../interface/i-map-manager";
import { Component, OnInit, inject, Injectable } from '@angular/core';
import { GoogleMap } from '../class/google/class-main';
import { YandexMap } from '../class/yandex/class-main';
import { BaiduMap } from "../class/baidu/class-main";
import { LeafletMap } from "../class/leaflet/class-main";
import { MainMap } from '../interface/i-main';
import * as data from "../maps.const.json";
import { LoadApiMap } from "../interface/i-init";
import { ObjectMap } from "./class-objmap";


@Injectable()
export class Manager implements MapManager {
    source: MainMap;
    mapType: MapType;

    constructor(private objectMap: ObjectMap, private google: GoogleMap, private yandex: YandexMap, private baidu: BaiduMap, private leaflet: LeafletMap) { }

    registrationMap(mapType: MapType): MapManager {
        this.mapType = mapType;
        switch (mapType) {
            case MapType.google: {
                this.source = this.google;
                break;
            }
            case MapType.yandex: {
                this.source = this.yandex;
                break;
            }
            case MapType.leaflet: {
                this.source = this.leaflet;
                break;
            }
            case MapType.baidu: {
                this.source = this.baidu;
                break;
            }
        }

        return this;
    }

    load(id: string) {
        let dt: LoadApiMap = data['InitList'][MapType[this.mapType]];
        this.source.init.loadScriptMap(dt)
            .then(data => {
                if (data.status === 'Loaded') {
                    let load = this.source.init.initializingMap(id);
                   // console.log(load.objMap,'objMap')
                    this.objectMap.map = load.objMap;
                    // this.source.objectMap = this.objectMap;
                    //  this.source.cluster = load.markercluster;
                    //  this.source.traffic = load.traffic;
                    // this.source.events.subscribe(this.objectMap.map);

                }
            }).catch(error => console.log(error));
    }

    destroy() {
        this.source.init.destroyMap();
    }

    resultMap(): MainMap {
        return this.source;
    }
}