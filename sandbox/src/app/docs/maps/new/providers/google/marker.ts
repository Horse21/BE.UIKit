import { BaseMarker } from "../../entity/base-marker";
import { IIcon } from "../../interfaces/i-icon";
import { GoogleMarkerOptions } from "./entity/google-marker-options";
import { Injectable } from "@angular/core";

@Injectable()
export class GoogleMarker extends BaseMarker {
    
    options: GoogleMarkerOptions;

    constructor(options: GoogleMarkerOptions) {
        super(options);
    }

    markerClicked(): void {
        throw new Error("Method not implemented.");
    }
}