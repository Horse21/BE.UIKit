import { Component, Injector, OnInit, Output } from '@angular/core';
import {FormControl} from '@angular/forms';
import { map, startWith, debounceTime } from 'rxjs/internal/operators';
import { City } from '../../dto/city';
import { Observable } from 'rxjs/index';
import { VocabularyService } from '../../services/vocabulary-service';
// import {MomentDateAdapter} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'fly-route-selection',
  template: `
  <div class="c-fly-route-selection">
	  <mat-form-field color="primary" class="form-field-test">
		  <input type="text" matInput placeholder="From" [formControl]="cityFromControl" [matAutocomplete]="citiesAutocomplete">
		  <mat-icon matSuffix>flight_takeoff</mat-icon>
	  </mat-form-field>
	  <div class="relative-box">
		  <div class="c-fly-route-selection_route-matker"></div>
		  <button mat-icon-button class="c-fly-route-selection_swap-btn">
			  <mat-icon>swap_vert</mat-icon>
		  </button>
	  </div>
	  <mat-form-field color="primary" class="form-field-test">
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
	  
	  <!--<div class="c-fly-route-selection_add-remove-buttons-box">-->
		  <!--<button mat-icon-button>-->
			  <!--<mat-icon>cancel</mat-icon>-->
		  <!--</button>-->
		  <!--<button mat-icon-button>-->
			  <!--<mat-icon color="accent">add_circle</mat-icon>-->
		  <!--</button>-->
	  <!--</div>-->
  </div>
  `
})
export class FlyRouteSelectionComponent implements OnInit {
	cityFromControl: FormControl = new FormControl();
	cityToControl: FormControl = new FormControl();
	filteredCities: Observable<City[]>;
	_vocabulary: VocabularyService = this.injector.get(VocabularyService);

	constructor(private injector:Injector) {
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


