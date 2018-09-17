export interface EventMap {
    listenEvent(map: any, eventName: string);
    idle(map: any, callback: () => void);
    boundsChange(map: any);
    zoomChange(map: any);
    clickMap(map: any);
}