export interface MarkerMap {
    //marker:any;
    ShowMarker(map:any,bounds:boolean,cluster:boolean)
    ListenEvent(map: any, eventName: string);
    Click(map: any,marker:any);
}