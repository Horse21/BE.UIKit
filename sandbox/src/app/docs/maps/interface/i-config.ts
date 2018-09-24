export interface IMapOptions {
    showMarker(marker:any);
    getZoom(): number;
    setZoom(zoom: number);
    setZoomMin(zoom: number);
    setZoomMax(zoom: number);
    transitLayer(transit: any, boolean: boolean);
    trafficLayer(transit: any, boolean: boolean);
    getAddress(coord: any);
    setMarkers();
    clearMap();
    resizeMap();
    routeMap(start: any, end: any, show: boolean);
    fitBounds();
    setCenterMap();
    getBounds();
    resetMap();
    setZoomLevel(type: string);
    drawingShapesMap(type: string);
    inclusionMarkersRadius(Lat1: number, Lng1: number, Lat2: number, Lng2: number);
    inclusionMarkersPolygon(coord: any, xp: any, yp: any);
    draggableMap(boolean: boolean);
}

