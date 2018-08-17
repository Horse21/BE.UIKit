export interface EventMap{
    ListenEvent(eventName: string);
    Idle();
    BoundsChange();
    ZoomChange();
    Click();
}