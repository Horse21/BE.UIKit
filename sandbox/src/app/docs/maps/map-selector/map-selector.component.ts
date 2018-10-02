import { Component, Injectable  } from '@angular/core';
import { MapType } from '../new/enum/e-map-type';
import {MapManager} from '../new/entity/map-manager';
import { GoogleMap } from '../new/providers/google/map';

@Component({
  selector: 'app-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.css'],
})
export class MapSelectorComponent {
  selectedMap = MapType.GOOGLE
  mapsEnum: MapType;
  mapInfo: mapInfoForSelect[];

  constructor(private manager: MapManager) {
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
   this.manager.selectMap(mapType);
  }

  ngAfterViewInit(): void {
    this.InitMap(MapType.GOOGLE);    
  }
}


@Injectable()
export class mapInfoForSelect {
  public value: string;
  public name: string;
  public active: boolean;
}