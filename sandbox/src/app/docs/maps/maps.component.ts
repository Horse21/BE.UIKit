import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Manager } from './class/class-imap-manager';
import { GoogleMap } from './class/google/class-main';
import { ObjectMap } from './class/class-objmap';
import { YandexMap } from './class/yandex/class-main';
import { BaiduMap } from './class/baidu/class-main';
import { LeafletMap } from './class/leaflet/class-main';

@Component({
    selector: 'maps-components-docs',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css'],
    providers: [Manager, ObjectMap, GoogleMap, YandexMap, BaiduMap, LeafletMap]
})

export class MapsComponent implements OnInit, AfterViewInit {

    @Input() userInput: string;

    ngAfterViewInit() {

    }
    ngOnInit() {
        console.log('Map')
    }
    ngOnDestroy() {
      
    }

}

