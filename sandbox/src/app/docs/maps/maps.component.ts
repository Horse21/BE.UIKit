import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { GoogleMap } from './class/google/class-main';
import { LoadApiMap, InitMap } from "./interface/i-init";
import { MapOptions } from "./interface/i-config";
import * as data from "./maps.const.json";
import { MarkerMap } from './interface/i-marker';
import { MainMap } from './interface/i-main';
import { InfoWindowMap } from './interface/i-infowindow';
import { MarkerClusterMap } from './interface/i-markercluster';
import * as markercluster from "./markercluster.json";
import * as markers from "./test.markers.json";


@Component({
    selector: 'maps-components-docs',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css'],
})

export class MapsComponent implements OnInit, AfterViewInit {

    

    ngAfterViewInit() {
      
    }

    ngOnInit() {
      
    }
}