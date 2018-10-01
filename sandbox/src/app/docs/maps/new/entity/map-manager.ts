import { AbstractMap } from "../abstract/abstract-map";
import { MapType } from "../enum/e-map-type";
import { FetchStatus } from "../enum/e-fetch-status";
import { IMap } from "../interfaces/i-map";
import { Injectable } from "@angular/core";
import { GoogleMap } from "../providers/google/map";
import * as data from "../../maps.const.json";

@Injectable()
export class MapManager {
    mapType: MapType;
    map: AbstractMap;
    hashtable: { [name: string]: AbstractMap; } = {};

    constructor(private googleMap: GoogleMap) {
        this.register(MapType.GOOGLE, googleMap)
        
        
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
                console.log(status);
                if (status == FetchStatus.SUCCESS) {
                    this.currentMap.init();
                    this.currentMap.events.mapClicked(this.currentMap.config.getAddress.bind(this));
                    this.currentMap.events.boundsChanged(this.currentMap.config.drawMarkersOnMap.bind(this));
                    this.currentMap.events.idle(this.currentMap.config.drawMarkersOnMap.bind(this));
                    this.currentMap.events.dragFinished(this.currentMap.config.drawMarkersOnMap.bind(this));
                    this.currentMap.events.zoomFinished(this.currentMap.config.drawMarkersOnMap.bind(this));
                    this.currentMap.events.zoomChanged(this.currentMap.config.drawMarkersOnMap.bind(this));
                }
            })
    }

    destroy(): void {
       
    }

    public changeType(type: MapType): void{
        this.mapType = type;
    }
}