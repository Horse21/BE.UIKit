export interface IEventMap {
    idle(callback: () => void);
    boundsChange(callback: () => void);
    zoomChange(callback: () => void);
    clickMap(callback: () => void);
    dragend(callback: () => void);
    zoomend(callback: () => void);
}