import { Injectable } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { LoadApiMap, InitMap } from "../../interface/interface-init";
import { EventMap } from "../../interface/interface-event";
import { ConfigMap } from "../../interface/interface-config";
import { MainMap } from "../../interface/interface-main";
import { mapTo } from "../../../../../../node_modules/rxjs/operators";

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

    public map: any;

    constructor() {
        this.init = new Initialize();
        this.events = new Events();
        this.config = new Config();
    }
}

class Initialize implements InitMap {
    
    source: LoadApiMap;    

    public Init(source: LoadApiMap): Promise<any> {
        return new Promise((resolve, reject) => {
            this.source = source;
            console.log(source, 'source')
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
        return new google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        });
    }

    Destroy() {
        throw new Error("Method not implemented.");
    }
}

class Config implements ConfigMap {

    GetZoom(map: any): number {
        throw new Error("Method not implemented.");
    }   

    SetZoom(map: any, zoom: number) {
        throw new Error("Method not implemented.");
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

    Click(map: any) {
        this.ListenEvent<{ latLng: LatLng }>(map, "click").subscribe((latLng) => {
            console.log("click", latLng.latLng.lat());
        })
    }
}