import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
// import {MomentDateAdapter} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'fly-route-selection',
  template: `
  <div class="c-fly-route-selection">
	  <mat-form-field color="primary" class="form-field-test">
		  <input type="text" matInput placeholder="From" [formControl]="citiesAutocomplete" [matAutocomplete]="cities">
		  <mat-icon matSuffix>flight_takeoff</mat-icon>
	  </mat-form-field>
	  <div class="relative-box">
		  <div class="c-fly-route-selection_route-marker route-marker__route-num-{{routeNumber}}"></div>
		  <button mat-icon-button class="c-fly-route-selection_swap-btn">
			  <mat-icon>swap_vert</mat-icon>
		  </button>
	  </div>
	  <mat-form-field color="primary" class="form-field-test">
		  <input type="text" matInput placeholder="To" [formControl]="citiesAutocomplete" [matAutocomplete]="cities">
		  <mat-icon matSuffix>flight_land</mat-icon>
	  </mat-form-field>
	  <mat-autocomplete #cities="matAutocomplete">
		  <mat-option [value]="'London'">London</mat-option>
		  <mat-option [value]="'Saint Petersburg'">Saint Petersburg</mat-option>
		  <mat-option [value]="'Berlin'">Berlin</mat-option>
		  <mat-option [value]="'Moscow'">Moscow</mat-option>
	  </mat-autocomplete>

	  <mat-form-field>
		  <input matInput [matDatepicker]="arrivalDatePicker" placeholder="Arrival Date" >
		  <mat-datepicker-toggle matSuffix [for]="arrivalDatePicker">
			  <mat-icon matDatepickerToggleIcon>date_range</mat-icon>
		  </mat-datepicker-toggle>
		  <mat-datepicker #arrivalDatePicker></mat-datepicker>
	  </mat-form-field>
	  
	  <div class="c-fly-route-selection_add-remove-buttons-box" *ngIf="showAddRemoveButtons == true">
		  <button mat-icon-button class="c-fly-route-selection_remove-button">
			  <mat-icon>cancel</mat-icon>
		  </button>
		  <button mat-icon-button class="c-fly-route-selection_add-button">
			  <mat-icon>add_circle</mat-icon>
		  </button>
	  </div>
  </div>
  `
})
export class FlyRouteSelectionComponent {
	@Input() routeNumber = 1;
	@Input() showAddRemoveButtons = false;

	citiesAutocomplete: FormControl = new FormControl();
}


