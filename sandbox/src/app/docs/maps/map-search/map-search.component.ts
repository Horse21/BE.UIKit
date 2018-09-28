import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as Manager from '../class/class-imap-manager';
import { Point } from "../interface/i-point";
import { MatAutocompleteTrigger } from '@angular/material';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})

export class MapSearchComponent  {
  constructor(private manager: Manager.Map.Manager) {
    this.SearchPoint = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterListAutocomplete(state) : this.ListAutocomplete.slice())
      );
  }

  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;
  
  stateCtrl = new FormControl();
  SearchPoint: Observable<any[]>;
  ListAutocomplete: Point[] = [];
 
  private ChangeInputFrom(value: string) {
    if (value.length > 1) {
      let result = this.manager.getActiveMap().search.SearchMap(value);
      this.ListAutocomplete = result;
    }
    if (value.length == 0) {
      this.autocomplete.closePanel();
      this.ListAutocomplete = [];
      
    }
  }

  private ChangeInput(value: string) {
    if (value.length > 1) {
      let result = this.manager.getActiveMap().search.SearchMap(value);
      this.ListAutocomplete = result;
    }
    if (value.length == 0) {
      this.autocomplete.closePanel();
      this.ListAutocomplete = [];
    }
  }

  private SelectAutocomplete(value: any) {
    this.manager.getActiveMap().search.GetDetailsPointAutocomplete(value);
  }
  private filterListAutocomplete(value: string): Point[] {
    return this.ListAutocomplete.filter(state => state.Hotelname);
  }

}