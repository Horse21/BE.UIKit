import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MapManager } from '../entity/map-manager';
import { MatAutocompleteTrigger } from '@angular/material';
import { Point } from '../entity/point';
import { TypeRoute } from '../enum/e-type-route';
import { IPoint } from '../interfaces/i-point';

let pointFrom: IPoint;
let pointTo: IPoint;

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
          this.manager.getActiveMap().config.clearAllMap();
          this.ListAutocomplete = [];
        }
        break

      case 'to':

        if (value.length == 0) {
          this.manager.getActiveMap().config.clearAllMap();
          this.ListAutocomplete = [];
        }
      default:
        break
    }

    if (value.length > 1) {
      let searchresult = this.manager.getActiveMap().search.search(value);
      this.ListAutocomplete = searchresult;
    }
  }

  private SelectAutocomplete(placeid, type) {
    this.manager.getActiveMap().config.getDetailsPoint(placeid).subscribe(point => {
      this.manager.getActiveMap().config.showMarker(point, true);

      switch (type) {
        case 'from':
          pointFrom = point;
          break
        case 'to':
          pointTo = point;
        default:
          break
      }

      this.ShowRoute();

    });

    this.manager.getActiveMap().loadMarkers = false;
    this.manager.getActiveMap().config.clearAllMap();
    this.ListAutocomplete = [];
  }

  private filterListAutocomplete(value: string): Point[] {
    return this.ListAutocomplete.filter(point => point.name);
  }

  private ShowRoute() {

    if (pointTo != null && pointFrom != null || pointFrom != null && pointTo != null) {

      this.manager.getActiveMap().config.buildRoute(pointFrom, pointTo, TypeRoute.CAR, true);

    }
  }
}