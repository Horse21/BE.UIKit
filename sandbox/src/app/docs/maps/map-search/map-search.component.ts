import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as Manager from '../class/class-imap-manager';
import { Point } from "../interface/i-point";
import { MatAutocompleteTrigger } from '@angular/material';

let From = null;
let To = null;

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
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }

  
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  stateCtrl = new FormControl();
  SearchPoint: Observable<any[]>;
  states: Point[] = [];
 
  private ChangeInputFrom(value: string) {
    console.log(value)
    if (value.length > 1) {
      let result = this.manager.getActiveMap().search.SearchMap(value);
      this.states = result;
    }
    if (value.length == 0) {
      this.autocomplete.closePanel();
      this.states = [];
      To = null;
      
    }
  }

  private ChangeInputTo(value: string) {
    if (value.length > 1) {
      let result = this.manager.getActiveMap().search.SearchMap(value);
      this.states = result;
    }
    if (value.length == 0) {
      this.autocomplete.closePanel();
      this.states = [];
      From = null;
    }
  }

  

  private SelectAutocompleteFrom(value: any) {
    
    //this.manager.getActiveMap().search.GetDetailsPointAutocomplete(value);
    console.log(value,'FROM')

  }

  private SelectAutocompleteTo(value: any) {
    To = value;
   // this.manager.getActiveMap().search.GetDetailsPointAutocomplete(value);
   console.log(value,'To')
  }

  private _filterStates(value: string): Point[] {
    return this.states.filter(state => state.Hotelname);
  }

}
