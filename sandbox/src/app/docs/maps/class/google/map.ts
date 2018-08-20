import { Injectable } from "@angular/core";
import { Observable, Observer, config } from 'rxjs';
import { LoadApiMap, InitMap } from "../../interface/interface-init";
import { EventMap } from "../../interface/interface-event";
import { ConfigMap } from "../../interface/interface-config";
import { MainMap } from "../../interface/interface-main";
import { MarkerMap } from "../../interface/interface-marker";
import { InfoWindowMap } from "../../interface/interface-infowindow";
import * as mapstyle from "../../class/google/maps.style.json";
import { MarkerClusterMap } from "../../interface/interface-markercluster";
//

declare var require: any;
declare var placeId: any;
declare var event: any;
//require('../../../images/icon/truck3.png')
// markerIconUrl() {
//    return require('../../../images/truck3.png')
// }

declare var document: any;
declare var google: any;
declare var addListener: any;


export interface LatLng {
    constructor(lat: number, lng: number): void;
    lat(): number;
    lng(): number;
}

@Injectable()
export class GoogleMap implements MainMap {
    init: InitMap;
    events: EventMap;
    config: ConfigMap;
    marker: MarkerMap;
    infowindow: InfoWindowMap;
    markercluster: MarkerClusterMap;
    public map: any;
    public traffic: any;
    public transit: any;

    constructor() {
        this.init = new Initialize();
        this.events = new Events();
        this.config = new Config();
        this.marker = new Marker();
        this.infowindow = new InfoWindow();
        this.markercluster = new Markercluster();

    }
}

class Initialize implements InitMap {

    source: LoadApiMap;

    public Init(source: LoadApiMap): Promise<any> {
        return new Promise((resolve, reject) => {
            this.source = source;
            let script = document.createElement('script');
            script.type = 'text/javascript';
            let url: string;
            url = source.src + '&key=' + source.key + '&v=' + source.version + '&language=' + source.language
            script.src = url;
            if (script.readyState) {
                script.onreadystatechange = () => {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        resolve({ loaded: true, status: 'Loaded' });
                    }
                };
            } else {
                script.onload = () => {
                    resolve({ loaded: true, status: 'Loaded' });
                };
            }
            script.onerror = (error: any) => {
                reject({ loaded: false, status: 'Error' });
            };
            document.getElementsByTagName('head')[0].appendChild(script);
        });
    }


    Load(): any {
        console.log(mapstyle, 'STYLE');

        let map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(55.753215, 37.622504),
            zoom: 12,
            disableDefaultUI: true,
            minZoom: 3,
            scaleControl: true,
            draggableCursor: 'default',
            disableDoubleClickZoom: true,
            // styles: mapstyle
        });

        let traffic = new google.maps.TrafficLayer();
        let transit = new google.maps.TransitLayer();
        let geocoder = new google.maps.Geocoder();
        let placesService = new google.maps.places.PlacesService(map);
        return { map: map, traffic: traffic, transit: transit, geocoder: geocoder, placesService: placesService }
    }

    Destroy() {
        throw new Error("Method not implemented.");
    }
}

class Config implements ConfigMap {
    SetZoomLevel(map: any, type: string) {
        throw new Error("Method not implemented.");
    }
    DrawingShapesMap(map: any, type: string) {
        throw new Error("Method not implemented.");
    }
    InclusionMarkersRadius(map: any, Lat1: number, Lng1: number, Lat2: number, Lng2: number) {
        throw new Error("Method not implemented.");
    }
    InclusionMarkersPolygon(coord: any, xp: any, yp: any) {
        throw new Error("Method not implemented.");
    }
    SetZoomMin(map: any, zoom: number) {
        throw new Error("Method not implemented.");
    }
    SetZoomMax(map: any, zoom: number) {
        throw new Error("Method not implemented.");
    }
    SetMarkers(map: any, markers: any[]) {
        throw new Error("Method not implemented.");
    }
    ClearMap(map: any) {
        throw new Error("Method not implemented.");
    }
    ResizeMap(map: any) {
        throw new Error("Method not implemented.");
    }
    RouteMap(map: any, start: any, end: any, show: boolean) {
        throw new Error("Method not implemented.");
    }
    FitBounds(map: any) {
        throw new Error("Method not implemented.");
    }
    SetCenterMap(map: any) {
        throw new Error("Method not implemented.");
    }
    GetBounds(map: any) {
        throw new Error("Method not implemented.");
    }
    ResetMap(map: any) {
        throw new Error("Method not implemented.");
    }

    GetZoom(map: any): number {
        return map.getZoom();
    }

    SetZoom(map: any, zoom: number) {
        map.setZoom(zoom);
    }

    TransitLayer(map: any, transit: any, boolean: boolean) {
        if (boolean) {
            transit.setMap(map);
        }
        else {
            transit.setMap(null);
        }
    }

    TrafficLayer(map: any, traffic: any, boolean: boolean) {
        if (boolean) {
            traffic.setMap(map);
        }
        else {
            traffic.setMap(null);
        }
    }


    GetAddress(map: any, coord: any) {

    }
}

class Events implements EventMap {

    Subscribe(map: any) {
        this.Click(map);
        this.BoundsChange(map);
        this.Idle(map);
        this.ZoomChange(map);
    }

    ListenEvent<E>(map: any, eventName: string): Observable<E> {
        return new Observable((observer: Observer<E>) => {
            map.addListener(eventName, (arg: E) => { observer.next(arg); });
        });
    }

    Idle(map: any) {
        this.ListenEvent<void>(map, "idle").subscribe(() => {
            console.log("idle");
            let bounds = map.getBounds();
            if (bounds) {
                console.log('bounds', bounds);
                let SW = bounds.getSouthWest();
                let NE = bounds.getNorthEast();
            }
        })
    }

    BoundsChange(map: any) {
        this.ListenEvent<void>(map, "bounds_changed").subscribe(() => {
            console.log("bounds_changed");
        })
    }

    ZoomChange(map: any) {
        this.ListenEvent<void>(map, "zoom_changed").subscribe(() => {
            console.log("zoom_changed");
        })
    }

    //cb: Function
    Click(map: any) {
        this.ListenEvent<any>(map, "click").subscribe((event) => {
            if (event.placeId) {
                event.stop();
                console.log(event.placeId, 'event.placeId')

            }
            else {
                console.log(event.latLng)
               // cb();
            }
        })
    }
}

class Marker implements MarkerMap {
    ShowMarker(map: any, bounds: boolean, cluster: boolean) {

        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(55.753215, 37.622504),
            draggable: false,
            clickable: true,
            icon: { url: require('../../images/icon/icon_hotel.png') },
            title: 'Hotel Name'
        });

        //this.PointMap.push(obj);
        marker.setMap(map);
    }

    ListenEvent<E>(marker: any, eventName: string): Observable<E> {
        return new Observable((observer: Observer<E>) => {
            marker.addListener(eventName, (arg: E) => { observer.next(arg); });
        });
    }
    Click(marker: any) {
        console.log('click Marker', marker);
    }
}
class InfoWindow implements InfoWindowMap {
    OpenInfoWindow(map: any) {
        throw new Error("Method not implemented.");
    }    
    CloseInfoWindow(map: any) {
        throw new Error("Method not implemented.");
    }

     
}
class Markercluster implements MarkerClusterMap {
    ListenEvent(map: any, eventName: string) {
        throw new Error("Method not implemented.");
    }    
    Click(map: any, marker: any) {
        throw new Error("Method not implemented.");
    }  
}
