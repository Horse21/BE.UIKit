import { Component, OnInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { GoogleMap } from './class/google/class-main';
import { LoadApiMap, InitMap } from "./interface/interface-init";
import { MapOptions } from "./interface/interface-config";
import * as data from "./maps.const.json";
import { MarkerMap } from './interface/interface-marker';
import { MainMap } from './interface/interface-main';
import { InfoWindowMap } from './interface/interface-infowindow';
import { MarkerClusterMap } from './interface/interface-markercluster';
import * as markercluster from "./markercluster.json";
import * as markers from "./test.markers.json";
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
        setTimeout(()=> this.Init('google'), 5000);
        

    }
}