import { ILatLng } from "./i-latlng";

export interface IEventClikMap {
    latLng: ILatLng;
    placeId: string;
    stop():void;
}
