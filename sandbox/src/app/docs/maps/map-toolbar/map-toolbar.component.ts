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

  private zoomLevel(type:string) {
    this.manager.getActiveMap().config.setZoomLevel(type)
  }

  private drawShape(type:string) {
    this.manager.getActiveMap().config.drawingShapesMap(type);
  }

  private createMarker(type:string) {
    this.manager.getActiveMap().config.setZoomLevel(type);
  }

  private clearMap() {
    this.manager.getActiveMap().config.clearMap();
  }

  private transitLayer(){
    this.manager.getActiveMap().config.transitLayer(true)
  }

  private trafficLayer(){
    this.manager.getActiveMap().config.trafficLayer(true);
  }

  ngOnInit() {
  }
}