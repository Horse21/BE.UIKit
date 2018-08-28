import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { GoogleMap } from '../class/google/class-main';
import { LoadApiMap, InitMap } from "../interface/i-init";
import { MapOptions } from "../interface/i-config";
import * as data from "../maps.const.json";
import { MarkerMap } from '../interface/i-marker';
import { MainMap } from '../interface/i-main';
import { InfoWindowMap } from '../interface/i-infowindow';
import { MarkerClusterMap } from '../interface/i-markercluster';
import * as markercluster from "../markercluster.json";
import * as markers from "../test.markers.json";



@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.css']
})
export class MapContainerComponent implements OnInit {
  source: MainMap;
  @ViewChild('mapContainer') mapContainer: ElementRef;

  constructor() {

  }

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



public selectMap(val) {
    console.log('val', val)
}

ngAfterViewInit() {
    console.log(this.mapContainer);
}

ngOnInit() {
    setTimeout(() => this.Init('google'), 1000);
}
}
