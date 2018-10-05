import { Injectable } from "@angular/core";
import { IBaseMarkerOptions } from "../../../interfaces/i-base-marker-options";
import { IIcon } from "../../../interfaces/i-icon";
import { IPoint } from "../../../interfaces/i-point";
import { IPosition } from "../../../interfaces/i-position";
import { AbstractMap } from "../../../abstract/abstract-map";

@Injectable()
export class GoogleMarkerOptions implements IBaseMarkerOptions {
    draggable: boolean;
    visible: boolean;
    clickable: boolean;
    icon: IIcon;
    title: string;
    zIndex: number;
    position: IPosition;
    
}