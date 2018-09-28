import { AbstractMarkerCluster } from "../../abstract/abstract-marker-cluster";
import { BaseMarker } from "../../entity/base-marker";
import { MarkerClusterer } from '@google/markerclustererplus';
import { Injectable } from "@angular/core";

@Injectable()
export class GoogleMarkerCluster extends AbstractMarkerCluster {

    googleCluster: MarkerClusterer;

    constructor(googleCluster: MarkerClusterer) {
        super();
        this.googleCluster = googleCluster;
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