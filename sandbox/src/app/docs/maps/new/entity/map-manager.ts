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
    type: MapType;
    hashtable: { [name: string]: IMap; } = {};

    constructor(private google: GoogleMap) {
        this.hashtable[MapType.GOOGLE] = google;
        this.mapType = MapType.GOOGLE;
    }

    get currentMap() {
        return this.map;
    }

    register(type: MapType, container: HTMLElement): MapManager {
        this.destroy();
        this.mapType = type;
        this.load(container);

        return this;
    }

    load(container: HTMLElement): void {
        let fetchMapStatus: FetchStatus = data['InitList'][this.mapType];
        let selectedMapSource = this.hashtable[this.mapType];
        console.log(selectedMapSource)
        selectedMapSource.instance.onDataFetched(fetchMapStatus)
            .subscribe(data => {
                if (data == FetchStatus.SUCCESS) {
                    let map = selectedMapSource.instance.init(container);
                    selectedMapSource.config.events.mapClicked(selectedMapSource.config.getAddress.bind(this));
                    selectedMapSource.config.events.boundsChanged(selectedMapSource.config.drawMarkersOnMap.bind(this));
                    selectedMapSource.config.events.idle(selectedMapSource.config.drawMarkersOnMap.bind(this));
                    selectedMapSource.config.events.dragFinished(selectedMapSource.config.drawMarkersOnMap.bind(this));
                    selectedMapSource.config.events.zoomFinished(selectedMapSource.config.drawMarkersOnMap.bind(this));
                    selectedMapSource.config.events.zoomChanged(selectedMapSource.config.drawMarkersOnMap.bind(this));
                }
            })
    }

    destroy(): void {
        let selectedMapSource = this.hashtable[this.mapType];
        selectedMapSource.instance.destroy();
    }

}
