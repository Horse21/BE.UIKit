
import { Injectable } from "@angular/core";
import { Observable, Observer, config } from 'rxjs';
import { IInfoWindowMap } from "../../interface/i-infowindow";
export namespace Google {
@Injectable()
export class InfoWindow implements IInfoWindowMap {
    openInfoWindow(map: any) {
      
    }    
    closeInfoWindow(map: any) {
     
    }   
}
}