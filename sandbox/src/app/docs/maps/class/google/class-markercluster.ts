import { IMarkerClusterMap } from "../../interface/i-markercluster";
import { Injectable } from "@angular/core";

export namespace Google {
@Injectable()
export class Markercluster implements IMarkerClusterMap {
    Cluster:any;
    listenEvent(map: any, eventName: string) {
      
    }    
    clickMarkerCluster(map: any, marker: any) {
       
    }  
}
}