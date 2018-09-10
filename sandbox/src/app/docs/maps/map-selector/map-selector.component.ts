import { Component, OnInit, Injectable } from '@angular/core';
import { MapType } from '../interface/i-map-manager';

@Component({
  selector: 'app-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.css']
})
export class MapSelectorComponent implements OnInit {

  mapsEnum: MapType;

  constructor() {

  }

  public mapList() {
    let temp: mapInfoForSelect[] = Object.keys(MapType)
      .filter((type) => isNaN(<any>type))
      .map<mapInfoForSelect>(
        (type) => {
          let info: mapInfoForSelect = new mapInfoForSelect();
          info.value = type;
          info.name = type[0].toUpperCase() + type.slice(1);
          info.active = type === 'google' //MapType[MapType.google];
         // console.log('INFI',info)
          return info;
        });

    return temp;
  }

  public selectMap(type: string) {
    console.log('selectMap', type)
  }

  ngOnInit() {
    console.log('Selector')
  }

}

@Injectable()
export class mapInfoForSelect {
  public value: string;
  public name: string;
  public active: boolean;
}
