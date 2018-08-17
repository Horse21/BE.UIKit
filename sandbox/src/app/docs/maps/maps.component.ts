import { Component, OnInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { GoogleMap } from './class/google/map';
import { LoadApiMap, InitMap } from "./interface/interface-init";
import * as data from "./maps.const.json";

declare var google: any;
declare var MarkerClusterer: any;
declare var BMap: any;
declare var ymaps: any;

@Component({
    selector: 'maps-components-docs',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css'],
   // providers:[GoogleMap],
})


export class MapsComponent implements OnInit {
 
    point: any[];
    markerCluster: any;
    private script: InitMap;

   // require('./class/google/map');

    constructor() {
    }

    public Init(code: string) {
        switch (code) {
            case "yandex": {
                //this.script = new YandexMap();
            }
            case "baidu": {
                //this.script = new YandexMap();
            }
            default: {
                this.script = new GoogleMap();
                
            }
        }
        let source: LoadApiMap = data['InitList'][code];
        this.script.Init(source).then(data => {
            console.log(data, 'data')
            if (data.status === 'Loaded') {
                this.script.Load();
            }
        }).
        catch(error => console.log(error));
    }

    ngOnInit() {
        this.Init('google');
    }
}
