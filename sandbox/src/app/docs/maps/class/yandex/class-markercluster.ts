import { IMarkerClusterMap } from "../../interface/i-markercluster";
import { Injectable } from "@angular/core";
@Injectable()
export class MarkerclusterYandex implements IMarkerClusterMap {
    Cluster: any;
    listenEvent(map: any, eventName: string) {
    }
    clickMarkerCluster(map: any, marker: any) {
    }
}