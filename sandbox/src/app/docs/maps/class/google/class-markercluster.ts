import { IMarkerClusterMap } from "../../interface/i-markercluster";
import { Injectable } from "@angular/core";
@Injectable()
export class MarkerclusterGoogle implements IMarkerClusterMap {
    Cluster:any;
    listenEvent(map: any, eventName: string) {
        throw new Error("Method not implemented.");
    }    
    clickMarkerCluster(map: any, marker: any) {
        throw new Error("Method not implemented.");
    }  
}