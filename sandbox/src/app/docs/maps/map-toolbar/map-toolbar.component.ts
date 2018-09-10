import { Component, OnInit } from '@angular/core';
import * as markercluster from "../markercluster.json";
import * as markers from "../test.markers.json";
import { Manager } from '../class/class-imap-manager';

@Component({
  selector: 'app-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.css']
})
export class MapToolbarComponent implements OnInit {

  constructor(private manager: Manager) {
  }

  public zoomLevel(type:string) {
    console.log('zoomLevel', this.manager.source)
    this.manager.source.config.setZoomLevel(type)
  }

  public drawShape(type:string) {
    this.manager.source.config.drawingShapesMap(type);
  }

  public createMarker(type:string) {
    this.manager.source.config.setZoomLevel(type);
  }

  public loadMarkers() {
    let markersArray: any = markers['default'];
    this.manager.source.config.setMarkers(markersArray, this.manager.source.cluster);
  }

  public clearMap() {
    this.manager.source.config.clearMap();
  }

  ngOnInit() {
    console.log('Toolbar')
  }
}