import { AbstractMarkerCluster } from "../../abstract/abstract-marker-cluster";
import { BaseMarker } from "../../entity/base-marker";
import { MarkerClusterer } from '@google/markerclustererplus';
import { Injectable } from "@angular/core";

@Injectable()
export class GoogleMarkerCluster extends AbstractMarkerCluster {

    googleCluster: MarkerClusterer;

    constructor() {
        super();

        let mcOptions = {
            gridSize: 100, 
            maxZoom: 19, 
            zoomOnClick: true,
            ignoreHidden: false,
             styles: [
                {
                    textColor: 'black',
                    url: './assets/icons_map/icon_pointgroup.png',
                    anchorText: [0, -2],
                    height: 44,
                    width: 44
                }]
        };
        //this.googleCluster = new MarkerClusterer(this.objMap.map, [], mcOptions);
    }

    addMarker(marker: BaseMarker, show?: boolean): void {
        this.googleCluster.addMarker(marker, show);
    }

    refreshMarkers(): void {
        this.googleCluster.redraw_();
    }

    removeMarker(marker: BaseMarker) {
        this.googleCluster.removeMarker(marker, false);
    }

    resetViewport(): void {
        this.googleCluster.resetViewport_();
    }

}