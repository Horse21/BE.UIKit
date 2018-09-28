import { Injectable } from "@angular/core";
import { IBaseMarkerOptions } from "../../../interfaces/i-base-marker-options";
import { IIcon } from "../../../interfaces/i-icon";

@Injectable()
export class GoogleMarkerOptions implements IBaseMarkerOptions {
    draggable: boolean;
    visible: boolean;
    clickable: boolean;
    icon: IIcon;
    title: string;
    zIndex: number;
}