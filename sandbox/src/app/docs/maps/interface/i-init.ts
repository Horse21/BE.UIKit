import { Observable } from "rxjs";

export interface ILoadApiMap {
    name: string;
    src: string;
    key: string;
    language: string;
    version:string;
}

export interface IInitMap {
    source: ILoadApiMap;
    loadScriptMap (source: ILoadApiMap):Promise<any>;
    initializingMap(id:string): any;
    destroyMap():void;
}