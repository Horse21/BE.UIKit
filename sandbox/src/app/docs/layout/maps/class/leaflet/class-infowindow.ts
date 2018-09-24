
import { Injectable } from "@angular/core";
import { Observable, Observer, config } from 'rxjs';
import { IInfoWindowMap } from "../../interface/i-infowindow";
export namespace Map.Leaflet {
@Injectable()
export class InfoWindowLeaflet implements IInfoWindowMap {
    openInfoWindow(map: any) {
      
    }    
    closeInfoWindow(map: any) {
     
    }   
}
}
