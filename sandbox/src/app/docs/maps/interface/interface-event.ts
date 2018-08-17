export interface EventMap {
    Subscribe(map: any);

    ListenEvent(map: any, eventName: string);
    Idle(map: any);
    BoundsChange(map: any);
    ZoomChange(map: any);
    Click(map: any);
}