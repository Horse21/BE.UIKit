import { Component, OnInit, Injectable, ViewChild, ElementRef } from '@angular/core';
import { MapType } from '../interface/i-map-manager';
import { Manager } from '../class/class-imap-manager';


@Component({
  selector: 'app-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.css']
})
export class MapSelectorComponent implements OnInit {
  selectedMap = MapType.google
  @ViewChild('mapContainer') mapContainer: ElementRef;
  mapsEnum: MapType;
  mapInfo: mapInfoForSelect[];

  constructor(private manager: Manager) {
    this.mapInfo = this.mapList('google');
  }

  private mapList(nameMap: string): mapInfoForSelect[] {
    let temp: mapInfoForSelect[] = Object.keys(MapType)
      .filter((type) => isNaN(<any>type))
      .map<mapInfoForSelect>(
        (type) => {
          let info: mapInfoForSelect = new mapInfoForSelect();
          info.value = type;
          info.name = type[0].toUpperCase() + type.slice(1);
          info.active = type === nameMap; //MapType[MapType.google];
          return info;
        });

    return temp;
  }

  public selectMap(type: string) {
    this.manager.destroy();
    this.mapInfo = this.mapList(type);
    this.selectedMap = MapType[type];
    this.InitMap();
  }

  public InitMap() {
    this.manager.registrationMap(this.selectedMap).load('map');
  }

  ngOnInit() {
    this.InitMap()
  }

}

@Injectable()
export class mapInfoForSelect {
  public value: string;
  public name: string;
  public active: boolean;
}
