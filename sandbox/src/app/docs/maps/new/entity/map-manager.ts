import { AbstractMap } from "../abstract/abstract-map";
import { MapType } from "../enum/e-map-type";
import { FetchStatus } from "../enum/e-fetch-status";
import { Injectable } from "@angular/core";
import { GoogleMap } from "../providers/google/map";
import * as data from "../../maps.const.json";
import { IEventClikMap } from "../providers/google/interfaces/i-event-clik-map";

@Injectable()
export class MapManager {
    mapType: MapType;
    private map: AbstractMap;
    hashtable: { [name: string]: AbstractMap; } = {};

    constructor(private googleMap: GoogleMap) {
        this.register(MapType.GOOGLE, googleMap);
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
                    this.currentMap.events.mapClicked<IEventClikMap>().subscribe((IEventClikMap) => {
                        this.currentMap.config.onClickMap(IEventClikMap)
                    });
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