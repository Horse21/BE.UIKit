import { Component } from '@angular/core';
import { MapManager } from '../new/entity/map-manager';
import { ZoomType } from '../new/enum/e-zoom-type';

@Component({
  selector: 'app-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.css']
})
export class MapToolbarComponent {

  constructor(private manager: MapManager) { }

  private zoomLevel(type: string) {
    
    if (type === ZoomType.In) {
      this.manager.getActiveMap().config.zoomIn();
    }
    else {
      this.manager.getActiveMap().config.zoomOut();
    }
  }

  private drawShape(type: string) {
  }

  private createMarker(type: string) {
  }

  private clearMap() {
  }

  private onChangeTransit(event: any) {

    this.manager.getActiveMap().config.toggleTransitLayer(event.checked);
  }

  private onChangeTraffic(event: any) {

    this.manager.getActiveMap().config.toggleTrafficJamLayer(event.checked);
  }



}