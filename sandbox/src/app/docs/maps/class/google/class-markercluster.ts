import { MarkerClusterMap } from "../../interface/interface-markercluster";

export class Markercluster implements MarkerClusterMap {
    Cluster:any;
    listenEvent(map: any, eventName: string) {
        throw new Error("Method not implemented.");
    }    
    clickMarkerCluster(map: any, marker: any) {
        throw new Error("Method not implemented.");
    }  
}