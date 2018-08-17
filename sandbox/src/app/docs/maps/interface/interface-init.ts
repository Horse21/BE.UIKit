export interface LoadApiMap {
    name: string;
    src: string;
    key: string;
    language: string;
    version:string;
}

export interface InitMap {
    source: LoadApiMap;
    Init (source: LoadApiMap);
    Load(): any;
    Destroy();
}