import { Component, OnInit } from '@angular/core';
import * as markercluster from "../markercluster.json";
import * as markers from "../test.markers.json";
import * as Manager  from '../class/class-imap-manager';

@Component({
  selector: 'app-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.css']
})
export class MapToolbarComponent implements OnInit {

  constructor(private manager: Manager.Map.Manager) {
  }

  public zoomLevel(type:string) {
    this.manager.getActiveMap().config.setZoomLevel(type)
  }

  public drawShape(type:string) {
    this.manager.getActiveMap().config.drawingShapesMap(type);
  }

  public createMarker(type:string) {
    this.manager.getActiveMap().config.setZoomLevel(type);
  }

  public loadMarkers() {
    let markersArray: any = markers['default'];
    this.manager.getActiveMap().config.setMarkers();
  }

  public clearMap() {
    this.manager.getActiveMap().config.clearMap();
  }

  ngOnInit() {
  }
}