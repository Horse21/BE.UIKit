import { Injectable } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { LoadApiMap, InitMap } from "../../interface/interface-init";
import { EventMap } from "../../interface/interface-event";

declare var document: any;
declare var google: any;
declare var addListener:any;

export interface LatLng {
    constructor(lat: number, lng: number): void;
    lat(): number;
    lng(): number;
}

@Injectable()
export class GoogleMap implements InitMap, EventMap {

    public map: any;
    public source: LoadApiMap;

    ListenEvent<E>(eventName: string): Observable<E> {
        return new Observable((observer: Observer<E>) => {
            this.map.addListener(eventName, (arg: E) => { observer.next(arg); });
        });
    }

    Idle() {
        this.ListenEvent<void>("idle").subscribe(() => {        
            console.log("idle");
            let bounds = this.map.getBounds();
            if (bounds) {
                console.log('bounds',bounds);
                let SW = bounds.getSouthWest();
                let NE = bounds.getNorthEast();
            }
        })
    }

    BoundsChange() {
        this.ListenEvent<void>("bounds_changed").subscribe(() => {               
            console.log("bounds_changed");
        })
    }

    ZoomChange() {
        this.ListenEvent<void>("zoom_changed").subscribe(() => {      
            console.log("zoom_changed");
        })
    }

    Click() {
        this.ListenEvent<{ latLng: LatLng }>("click").subscribe((latLng) => {         
            console.log("click", latLng.latLng.lat());

        })
    }

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

    Load(): void {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        });
        this.Click();
        this.BoundsChange();
        this.Idle();
        this.ZoomChange();
    }

    Destroy() {

    }
}