import { AbstractMap } from "../abstract/abstract-map";
import { MapType } from "../enum/e-map-type";
import { FetchStatus } from "../enum/e-fetch-status";
import { Injectable } from "@angular/core";
import { GoogleMap } from "../providers/google/map";
import { BaiduMap } from "../providers/baidu/map";
import * as data from "./../maps.const.json";
import { IEventClickMap } from "../providers/google/interfaces/i-event-clik-map";
import { YandexMap } from "../providers/yandex/map";


@Injectable()
export class MapManager {
    mapType: MapType;
    private map: AbstractMap;
    hashtable: { [name: string]: AbstractMap; } = {};

    constructor(
        private googleMap: GoogleMap,
        private baiduMap: BaiduMap,
        private yandexMap: YandexMap
    ) {
        this.register(MapType.GOOGLE, googleMap);
        this.register(MapType.BAIDU, baiduMap);
        this.register(MapType.YANDEX, yandexMap);
        this.changeType(MapType.GOOGLE);
    }

    private get currentMap(): AbstractMap {
        return this.map;
    }

    public selectMap(type: MapType): void {
        this.destroy();
        this.map = this.hashtable[type];
        this.load();
    }

    register(type: MapType, map: AbstractMap): MapManager {

        this.hashtable[type] = map;
        return this;
    }

    load(): void {
        this.currentMap.onDataFetched(data["InitList"][this.mapType])
            .subscribe(status => {
                if (status == FetchStatus.SUCCESS) {
                    this.currentMap.init();
                    this.currentMap.events.idle<void>().subscribe(() => {
                        this.currentMap.config.drawMarkersOnMap();
                    });
                    this.currentMap.events.dragFinished<void>().subscribe(() => {
                        this.currentMap.config.drawMarkersOnMap();
                    });
                    this.currentMap.events.zoomFinished<void>().subscribe(() => {
                        this.currentMap.config.drawMarkersOnMap();
                    });

                    this.currentMap.events.mapClicked<IEventClickMap>().subscribe((IEventClikMap) => {
                        this.currentMap.config.onClickMap(IEventClikMap)
                    });

                    this.currentMap.cluster.initMarkerCluster();

                }
            })
    }

    destroy(): void {
        try {
            this.currentMap.destroy();
        }
        catch{ }
    }

    public changeType(type: MapType): void {

        this.mapType = type;
    }

    public getActiveMap(): any {
        return this.map;
    }
}