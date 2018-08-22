export interface MapOptions {
    ShowMarker(map: any,marker:any,markecluster:any);
    GetZoom(map: any): number;
    SetZoom(map: any, zoom: number);
    SetZoomMin(map: any, zoom: number);
    SetZoomMax(map: any, zoom: number);
    TransitLayer(map: any, transit: any, boolean: boolean);
    TrafficLayer(map: any, transit: any, boolean: boolean);
    GetAddress(map: any, coord: any);
    SetMarkers(map: any, markers: any[]);
    ClearMap(map: any);
    ResizeMap(map: any);
    RouteMap(map: any, start: any, end: any, show: boolean);
    FitBounds(map: any);
    SetCenterMap(map: any);
    GetBounds(map: any);
    ResetMap(map: any);
    SetZoomLevel(map: any, type: string);
    DrawingShapesMap(map: any, type: string);
    InclusionMarkersRadius(map: any, Lat1: number, Lng1: number, Lat2: number, Lng2: number);
    InclusionMarkersPolygon(coord: any, xp: any, yp: any);
}