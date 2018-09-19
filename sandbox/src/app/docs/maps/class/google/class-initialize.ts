import { ILoadApiMap, IInitMap } from "../../interface/i-init";
import { Component, ViewChild, ElementRef, Injectable } from '@angular/core';
import * as mapstyle from "../../class/google/maps.style.json";
import * as MarkerClusterer from '@google/markerclustererplus';
export namespace Map.Google {
declare var document: any;
declare var google: any;
declare var require: any;
var objMap: any;

export class InitializeGoogle implements IInitMap {
    source: ILoadApiMap;
    public loadScriptMap(source: ILoadApiMap): Promise<any> {
        return new Promise((resolve, reject) => {
            this.source = source;
            let script = document.createElement('script');
            script.type = 'text/javascript';
            let url: string;
            url = source.src + '&key=' + source.key + '&language=' + source.language
            script.src = url;
            script.id = 'mapAPI';
            if (script.readyState) {
                script.onreadystatechange = () => {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        resolve({ loaded: true, status: 'Loaded' });
                    }
                };
            } else {
                script.onload = () => {
                    console.log('scriptLoad')

                };

                window['APILoaded'] = (ev) => {
                    console.log('google maps api loaded');
                    resolve({ loaded: true, status: 'Loaded' });
                }
            }
            script.onerror = (error: any) => {
                reject({ loaded: false, status: 'Error' });
            };
            document.getElementsByTagName('head')[0].appendChild(script);

        });

    }


    initializingMap(id: string): any {
        let mcOptions = {
            gridSize: 100, maxZoom: 19, zoomOnClick: true, ignoreHidden: false, styles: [
                {
                    textColor: 'black',
                    url: './assets/icons_map/icon_pointGroup.png',
                    anchorText: [0, -2],
                    height: 44,
                    width: 44
                }]
        };
        objMap = new google.maps.Map(document.getElementById(id), {
            center: new google.maps.LatLng(27.215556209029693, 18.45703125),
            zoom: 4,
            disableDefaultUI: true,
            minZoom: 3,
            scaleControl: true,
            draggableCursor: 'default',
            disableDoubleClickZoom: true,
            // styles: mapstyle.default
        });
        let markers: any[];
        let traffic = new google.maps.TrafficLayer();
        let transit = new google.maps.TransitLayer();
        let geocoder = new google.maps.Geocoder();
        let placesService = new google.maps.places.PlacesService(objMap);
        let markercluster = new MarkerClusterer(objMap, markers, mcOptions);
        return { objMap }
    }

    destroyMap() {
        google = null;
        let ds = document.getElementById('mapAPI');
        if (ds != null) {
            ds.remove();
        }

        var style = document.querySelectorAll('style')
        for (let i = 0; i < style.length; i++) {
            let remove = false;
            if (style[i].innerHTML.indexOf(".gm-style") != -1) { remove = true; }
            if (remove) { style[i].parentNode.removeChild(style[i]) };

        }
        let scripts = document.querySelectorAll("script[src*='maps.googleapis.com']");
        for (var i = 0; i < scripts.length; i++) {
            scripts[i].parentNode.removeChild(scripts[i]);
        }
        document.getElementById('map').innerHTML = "";

    }
}
}
