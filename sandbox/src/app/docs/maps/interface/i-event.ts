export interface IEventMap {
    listenEvent(map: any, eventName: string);
    idle(map: any, callback: () => void);
    boundsChange(map: any);
    zoomChange(map: any);
    clickMap(map: any);
    dragend(map: any, callback: () => void);
    zoomend(map: any, callback: () => void);
}