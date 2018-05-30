import { Component, Injector, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {map, startWith, debounceTime } from 'rxjs/internal/operators';
import {City} from '../../dto/city';
import {Observable} from 'rxjs/index';
import {VocabularyService} from '../../services/vocabulary-service';

@Component({
  selector: 'h21-fly-route-selection',
  template: `
  <div class="c-fly-route-selection">
	  <mat-form-field color="primary">
		  <input type="text" matInput placeholder="From" [formControl]="cityFromControl" [matAutocomplete]="citiesAutocompleteFrom"
				 [(ngModel)]="_cityFrom">
		  <mat-icon matSuffix>flight_takeoff</mat-icon>
	  </mat-form-field>
	  
	  <div class="relative-box">
		  <div class="c-fly-route-selection_route-marker route-marker__route-num-{{routeNumber}}"></div>
		  <button mat-icon-button class="c-fly-route-selection_swap-btn">
			  <mat-icon>swap_vert</mat-icon>
		  </button>
	  </div>
	  
	  <mat-form-field color="primary">
		  <input type="text" matInput placeholder="To" [formControl]="cityToControl" [matAutocomplete]="citiesAutocompleteTo"
				 [(ngModel)]="_cityTo">
		  <mat-icon matSuffix>flight_land</mat-icon>
	  </mat-form-field>
	  
	  <mat-autocomplete #citiesAutocompleteFrom="matAutocomplete" autoActiveFirstOption [displayWith]="displayCity">
		  <mat-option *ngFor="let city of filteredCities | async" [value]="city" (onSelectionChange)="onSelectFromItem($event)">
			  {{ city.name }}
		  </mat-option>
	  </mat-autocomplete>
	  
	  <mat-autocomplete #citiesAutocompleteTo="matAutocomplete" autoActiveFirstOption [displayWith]="displayCity">
		  <mat-option *ngFor="let city of filteredCities | async" [value]="city" (onSelectionChange)="onSelectToItem($event)">
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

	  <div class="c-fly-route-selection_add-remove-buttons-box" [hidden]="!canAdd && !canRemove">
		  <button mat-icon-button class="c-fly-route-selection_remove-button" *ngIf="canRemove" (click)="onRemove.emit()">
			  <mat-icon>cancel</mat-icon>
		  </button>
		  <button mat-icon-button class="c-fly-route-selection_add-button" *ngIf="canAdd" (click)="onAdd.emit()">
			  <mat-icon>add_circle</mat-icon>
		  </button>
	  </div>
  </div>
  `
})
export class H21FlyRouteSelectionComponent {
	@Input() routeNumber = 1;
	@Input() canAdd = true;
	@Input() canRemove = false;

	cityFromControl: FormControl = new FormControl();
	cityToControl: FormControl = new FormControl();
	filteredCities: Observable<City[]>;

	@Output() onAdd: EventEmitter<void> = new EventEmitter<void>();
	@Output() onRemove: EventEmitter<void> = new EventEmitter<void>();

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

	public _cityFrom: City;
	public _cityTo: City;

	@Input() get cityFrom(): City {
		return this._cityFrom;
	}

	set cityFrom(value: City) {
		this._cityFrom = value;
	}

	@Input() get cityTo(): City {
		return this._cityTo;
	}

	set cityTo(value: City) {
		this._cityTo = value;
	}

	@Output('cityFromChange') public cityFromChange: EventEmitter<City> = new EventEmitter<City>();
	@Output('cityToChange') public cityToChange: EventEmitter<City> = new EventEmitter<City>();

	onSelectFromItem($event) {
		if ($event) {
			this.cityFrom = $event.source.value;
			this.cityFromChange.emit(this._cityFrom);
		}
	}

	onSelectToItem($event) {
		console.log($event);
		if ($event) {
			this.cityTo = $event.source.value;
			this.cityToChange.emit(this._cityTo);
		}
	}
}


