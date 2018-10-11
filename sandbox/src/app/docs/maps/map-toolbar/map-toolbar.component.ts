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

    this.manager.getActiveMap().config.drawShapeOnMap(type);
  }

  private onChangeDraggableMarker(event: any) {

    this.manager.getActiveMap().config.draggableMarker(event.checked);
  }

  private onChangeClearObject(event: any) {

    this.manager.getActiveMap().config.loadMarkers = event.checked;
  }

  private createMarker(type: string) {

  }

  private clearMap() {

    this.manager.getActiveMap().config.clearAllMap();

  }

  private onChangeTransit(event: any) {

    this.manager.getActiveMap().config.toggleTransitLayer(event.checked);
  }

  private onChangeTraffic(event: any) {

    this.manager.getActiveMap().config.toggleTrafficLayer(event.checked);

  }



}