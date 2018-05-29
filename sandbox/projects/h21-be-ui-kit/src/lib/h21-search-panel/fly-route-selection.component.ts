import {Component, Injector, OnInit, Output, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {map, startWith, debounceTime } from 'rxjs/internal/operators';
import {City} from '../../dto/city';
import {Observable} from 'rxjs/index';
import {VocabularyService} from '../../services/vocabulary-service';

@Component({
  selector: 'fly-route-selection',
  template: `
  <div class="c-fly-route-selection">
	  <mat-form-field color="primary">
		  <input type="text" matInput placeholder="From" [formControl]="cityFromControl" [matAutocomplete]="citiesAutocomplete">
		  <mat-icon matSuffix>flight_takeoff</mat-icon>
	  </mat-form-field>
	  
	  <div class="relative-box">
		  <div class="c-fly-route-selection_route-marker route-marker__route-num-{{routeNumber}}"></div>
		  <button mat-icon-button class="c-fly-route-selection_swap-btn">
			  <mat-icon>swap_vert</mat-icon>
		  </button>
	  </div>
	  
	  <mat-form-field color="primary">
		  <input type="text" matInput placeholder="To" [formControl]="cityToControl" [matAutocomplete]="citiesAutocomplete">
		  <mat-icon matSuffix>flight_land</mat-icon>
	  </mat-form-field>
	  
	  <mat-autocomplete #citiesAutocomplete="matAutocomplete" autoActiveFirstOption [displayWith]="displayCity">
		  <mat-option *ngFor="let city of filteredCities | async" [value]="city">
			  {{ city.name }}
		  </mat-option>
	  </mat-autocomplete>

	  <mat-form-field>
		  <input matInput [matDatepicker]="arrivalDatePicker" placeholder="Arrival Date" >
		  <mat-datepicker-toggle matSuffix [for]="arrivalDatePicker">
			  <mat-icon matDatepickerToggleIcon>date_range</mat-icon>
		  </mat-datepicker-toggle>
		  <mat-datepicker #arrivalDatePicker></mat-datepicker>
	  </mat-form-field>

	  <div class="c-fly-route-selection_add-remove-buttons-box" *ngIf="canAdd || canRemove">
		  <button mat-icon-button class="c-fly-route-selection_remove-button" *ngIf="canRemove">
			  <mat-icon>cancel</mat-icon>
		  </button>
		  <button mat-icon-button class="c-fly-route-selection_add-button" *ngIf="canAdd">
			  <mat-icon>add_circle</mat-icon>
		  </button>
	  </div>
  </div>
  `
})
export class FlyRouteSelectionComponent {
	@Input() routeNumber = 1;
	@Input() canAdd = true;
	@Input() canRemove = false;

	cityFromControl: FormControl = new FormControl();
	cityToControl: FormControl = new FormControl();
	filteredCities: Observable<City[]>;

	constructor(private _vocabulary: VocabularyService) {
	}

	ngOnInit() {
		this.cityFromControl.valueChanges.subscribe(value => {
			this.filteredCities = this._vocabulary.getCities(value);
		});

		this.cityToControl.valueChanges.subscribe(value => {
			this.filteredCities = this._vocabulary.getCities(value);
		});
	}

	displayCity(city: City): string {
		return city ? city.name : null;
	}

	@Output('cityFrom')
	get cityFrom(): City {
		return this.cityFromControl.value;
	}

	@Output('cityTo')
	get cityTo(): City {
		return this.cityToControl.value;
	}
}


