import { Component, OnInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { GoogleMap } from './class/google/map';
import { LoadApiMap, InitMap } from "./interface/interface-init";
import { ConfigMap } from "./interface/interface-config";
import * as data from "./maps.const.json";
import { MainMap } from './interface/interface-main';

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
    private source: MainMap;

    public Init(code: string) {
        switch (code) {
            case "yandex": {
                //this.script = new YandexMap();
            }
            case "baidu": {
                //this.script = new YandexMap();
            }
            default: {
                this.source = new GoogleMap();
                
            }
        }
        let dt: LoadApiMap = data['InitList'][code];
        this.source.init.Init(dt).then(data => {
            console.log(data, 'data')
            if (data.status === 'Loaded') {
                this.source.map = this.source.init.Load();  
                this.source.events.Subscribe(this.source.map);     
            }
        }).
        catch(error => console.log(error));
    }

    ngOnInit() {
        this.Init('google');
    }
}
