export interface LoadApiMap {
    name: string;
    src: string;
    key: string;
    language: string;
    version:string;
}

export interface InitMap {
    source: LoadApiMap;
    loadScriptMap (source: LoadApiMap);
    initializingMap(id:string): any;
    destroyMap();
}