import { MapType } from "../../interface/i-map-manager";

export interface IMapManager {
    register(type: MapType, container: HTMLElement): void;
    load(container: HTMLElement): void;
    destroy(): void;
}
