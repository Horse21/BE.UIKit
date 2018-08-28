export enum MapType {
    google = 0,
    yandex = 1,
    leaftlet = 2,
    baidu = 3
}
export interface MapManager {
    registrationMap(type: string);
    resultMap(): any;
}