import { Component } from '@angular/core';
import { MapManager } from '../new/entity/map-manager';

@Component({
  selector: 'app-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.css']
})
export class MapToolbarComponent {

  constructor(private manager: MapManager) {}

  private zoomLevel(type: string) {
    if(type === 'plus'){
      this.manager.map.config.zoomIn();
    }
    else{
      this.manager.map.config.zoomOut();
    }
  }

  private drawShape(type: string) {
  }

  private createMarker(type: string) {
  }

  private clearMap() {
  }

  private onChangeTransit(event: any) {
    this.manager.map.config.toggleTransitLayer(event.checked);
  }

  private onChangeTraffic(event: any) {
    this.manager.map.config.toggleTrafficJamLayer(event.checked);
  }

}