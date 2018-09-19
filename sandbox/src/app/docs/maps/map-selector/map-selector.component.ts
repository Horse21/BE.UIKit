import { Component, OnInit, Injectable, Input, Output, ViewChild } from '@angular/core';
import { MapType } from '../interface/i-map-manager';
import * as  Manager from '../class/class-imap-manager';

@Component({
  selector: 'app-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.css']
})
export class MapSelectorComponent {
  selectedMap = MapType.google
  mapsEnum: MapType;
  mapInfo: mapInfoForSelect[];

  constructor(private manager: Manager.Map.Manager) {
    this.mapInfo = this.mapList('google');
    this.InitMap(MapType.google);
  }

  private mapList(nameMap: string): mapInfoForSelect[] {
    let temp: mapInfoForSelect[] = Object.keys(MapType)
      .filter((type) => isNaN(<any>type))
      .map<mapInfoForSelect>(
        (type) => {
          let info: mapInfoForSelect = new mapInfoForSelect();
          info.value = type;
          info.name = type[0].toUpperCase() + type.slice(1);
          info.active = type === nameMap;
          return info;
        });

    return temp;
  }

  public selectMap(type: string) {
    this.mapInfo = this.mapList(type);
    this.selectedMap = MapType[type];
    this.InitMap(MapType[type]);
  }

  public InitMap(mapType: MapType) {
    this.manager.registrationMap(mapType, 'map');
  }
}

@Injectable()
export class mapInfoForSelect {
  public value: string;
  public name: string;
  public active: boolean;
}
