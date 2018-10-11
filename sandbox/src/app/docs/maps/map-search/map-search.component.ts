import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MapManager } from '../new/entity/map-manager';
import { MatAutocompleteTrigger } from '@angular/material';
import { Point } from '../new/entity/point';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})

export class MapSearchComponent {
  constructor(private manager: MapManager) {

  }

  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  
  stateCtrl = new FormControl();
  SearchPoint: Observable<any[]>;
  ListAutocomplete: Point[] = [];

  private ChangeInput(value: string) {

    if (value.length > 1) {
      
     let searchresult =  this.manager.getActiveMap().search.search(value);

     console.log(searchresult,'searchresult')
    
    }
  }

  private SelectAutocomplete(placeid: any) {
    
    this.manager.getActiveMap().config.getDetailsPoint(placeid);
  }

}