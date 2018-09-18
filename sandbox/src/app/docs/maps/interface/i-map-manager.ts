import { IMainMap } from "./i-main";

export enum MapType {
    google = 0,
    yandex = 1,
    leaflet = 2,
    baidu = 3
}
export interface MapManager {
    registrationMap(mapType: MapType, id: string):MapManager;
    getActiveMap(): IMainMap;
}