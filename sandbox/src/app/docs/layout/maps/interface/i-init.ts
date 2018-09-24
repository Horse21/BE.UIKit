import { Observable } from "rxjs";
import { LoadStatus } from "../enum/e-loadstatus";

export interface ILoadApiMap {
    name: string;
    src: string;
    key: string;
    language: string;
    version: string;
}

export interface IInitMap {
    source: ILoadApiMap;
    loadScriptMap(source: ILoadApiMap): Observable<LoadStatus>;
    initializingMap(id: string): any;
    destroyMap(): void;
}