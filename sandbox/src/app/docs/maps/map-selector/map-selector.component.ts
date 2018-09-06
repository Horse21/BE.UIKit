import { Component, OnInit } from '@angular/core';
import { MapType } from '../interface/i-map-manager';

@Component({
  selector: 'app-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.css']
})
export class MapSelectorComponent implements OnInit {

  mapsEnum: MapType;

  constructor() { }

  public selectMap() {
  console.log('selectMap')
//console.log(this.mapsEnum)
  }

  ngOnInit() {
    console.log('Selector')
  }

}
