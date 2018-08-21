
import { Injectable } from "@angular/core";
import { Observable, Observer, config } from 'rxjs';
import { MarkerClusterMap } from "../../interface/interface-markercluster";


export class Markercluster implements MarkerClusterMap {
    ListenEvent(map: any, eventName: string) {
        throw new Error("Method not implemented.");
    }    
    Click(map: any, marker: any) {
        throw new Error("Method not implemented.");
    }  
}