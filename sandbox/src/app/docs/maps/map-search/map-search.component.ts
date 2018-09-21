import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as Manager from '../class/class-imap-manager';
import { Point } from "../interface/i-point";

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit {
  constructor(private manager: Manager.Map.Manager) {
    this.SearchPoint = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }

  stateCtrl = new FormControl();
  SearchPoint: Observable<any[]>;
  states: Point[] = [];
  ngOnInit() {

  }

  private ChangeAutocomplete(value: string) {
    if (value.length > 2) {
      let result = this.manager.getActiveMap().search.SearchMap(value);
      console.log(result, 'RESULT INPUT')
      this.states = result;
    }
  }

  private SelectAutocomplete(value: string) {
    console.log('Select', value)
  }

  private _filterStates(value: string): Point[] {
    return this.states.filter(state => state.name);
  }

}
