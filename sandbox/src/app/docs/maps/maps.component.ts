import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { LoadApiMap, InitMap } from "./interface/i-init";
import { MapOptions } from "./interface/i-config";
import { MarkerMap } from './interface/i-marker';
import { MainMap } from './interface/i-main';
import { InfoWindowMap } from './interface/i-infowindow';
import { MarkerClusterMap } from './interface/i-markercluster';
import * as markercluster from "./markercluster.json";
import * as markers from "./test.markers.json";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { GoogleMap } from './class/google/class-main';
import * as data from "./maps.const.json";
import { load } from '../../../../node_modules/@angular/core/src/render3/instructions';


@Component({
    selector: 'maps-components-docs',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css'],
})

export class MapsComponent implements OnInit {
    source: MainMap;
    public Init(code: string) {
        switch (code) {
            case "yandex": {
                //this.script = new YandexMap();
            }
            case "leaftlet": {
                //this.script = new LeaftletMap();
            }
            case "baidu": {
                //this.script = new YandexMap();
            }
            default: {
                this.source = new GoogleMap();
            }
        }
        let dt: LoadApiMap = data['InitList'][code];
        this.source.init.loadScriptMap(dt).then(data => {
            console.log(data, 'data')
            if (data.status === 'Loaded') {
                let load = this.source.init.initializingMap();
                this.source.map = load.map;
                this.source.cluster = load.markercluster
                this.source.traffic = load.traffic;
                this.source.events.subscribe(this.source.map);
            }
        }).
            catch(error => console.log(error));
    }

    public zoomLevel(type) {
        this.source.config.setZoomLevel(this.source.map, type);
    }

    public drawShape(type) {
        this.source.config.drawingShapesMap(this.source.map, type);
    }

    public createMarker(type) {
        this.source.config.setZoomLevel(this.source.map, 'plus');
    }

    public loadMarkers() {
        let markersArray: any
        markersArray = markers['default'];
        this.source.config.setMarkers(this.source.map, markersArray, this.source.cluster);
    }

    public clearMap() {
        this.source.config.clearMap(this.source.map);
    }

    ngOnInit() {
        setTimeout(()=> this.Init('google'), 1000);
        
    }
}