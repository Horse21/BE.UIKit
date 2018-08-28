import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { GoogleMap } from '../class/google/class-main';
import { LoadApiMap, InitMap } from "../interface/i-init";
import { MapOptions } from "../interface/i-config";
import * as data from "./maps.const.json";
import { MarkerMap } from '../interface/i-marker';
import { MainMap } from '../interface/i-main';
import { InfoWindowMap } from '../interface/i-infowindow';
import { MarkerClusterMap } from '../interface/i-markercluster';
import * as markercluster from "../markercluster.json";
import * as markers from "../test.markers.json";

@Component({
  selector: 'app-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.css']
})
export class MapToolbarComponent implements OnInit {
  source: MainMap;

  // constructor(s: MainMap) {
  //  // this.source = s;
  // }

  public zoomLevel(type) {
    console.log('zoomLevel', this.source)
    //this.source.config.setZoomLevel(this.source.map, type)
  }

  public drawShape(type) {
    //this.source.config.drawingShapesMap(this.source.map, type);
  }

  public createMarker(type) {
    // this.source.config.setZoomLevel(this.source.map, 'plus');
  }

  public loadMarkers() {
    // let markersArray: any
    //markersArray = markers['default'];
    // this.source.config.setMarkers(this.source.map, markersArray, this.source.cluster);
  }

  public clearMap() {
    //this.source.config.clearMap(this.source.map);
  }

  ngOnInit() {

    // console.log(this.source.map,'MAP');
  }

}
