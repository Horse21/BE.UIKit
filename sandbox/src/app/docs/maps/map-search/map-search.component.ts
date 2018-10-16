import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MapManager } from '../new/entity/map-manager';
import { MatAutocompleteTrigger } from '@angular/material';
import { Point } from '../new/entity/point';

let pointFrom: boolean = false;
let pointTo: boolean = false;


@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})

export class MapSearchComponent {

  constructor(private manager: MapManager) {
    this.SearchPoint = this.pointInput.valueChanges
      .pipe(
        startWith(''),
        map(point => point ? this.filterListAutocomplete(point) : this.ListAutocomplete.slice())
      );
  }

  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  pointInput = new FormControl();
  SearchPoint: Observable<any[]>;
  ListAutocomplete: Point[] = [];


  private ChangeInput(value: string, type: string) {

    switch (type) {
      case 'from':
        if (value.length == 0) {
          pointFrom = false;
          this.manager.getActiveMap().config.clearAllMap();
          this.ListAutocomplete = [];
        }
        else {
          pointFrom = true;
        }
        break

      case 'to':

        if (value.length == 0) {
          pointTo = false;
          this.manager.getActiveMap().config.clearAllMap();
          this.ListAutocomplete = [];
        }
        else {
          pointTo = true;
        }

      default:
        break
    }

    if (value.length > 1) {
      let searchresult = this.manager.getActiveMap().search.search(value);
      this.ListAutocomplete = searchresult;
    }

    this.ShowRouteMap();

  }

  private SelectAutocomplete(placeid: string, type: string) {

    switch (type) {
      case 'from':
        pointFrom = true;
        break

      case 'to':
        pointTo = true;
      default:
        break
    }

    this.manager.getActiveMap().config.getDetailsPoint(placeid).subscribe(point => {
      this.manager.getActiveMap().config.showMarker(point);
    });

    this.manager.getActiveMap().loadMarkers = false;
    this.manager.getActiveMap().config.clearAllMap();
    this.ListAutocomplete = [];
  }

  private ShowRouteMap() {
    this.manager.getActiveMap().route.showRoute();
  }
  private filterListAutocomplete(value: string): Point[] {
    return this.ListAutocomplete.filter(point => point.name);
  }

}