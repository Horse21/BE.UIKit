import {Component, Output, Input, EventEmitter, ViewChild, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AppSubscriberService} from '../../services/app-subscriber-service';
import {City} from '../../dto/city';
import {Observable} from 'rxjs';
import {VocabularyService} from '../../services/vocabulary-service';
import {H21TwoMonthCalendarComponent} from "../h21-two-month-calendar/h21-two-month-calendar.component";

@Component({
  selector: 'h21-fly-route-selection',
  templateUrl: './h21-fly-route-selection.component.html'
})

export class H21FlyRouteSelectionComponent implements OnInit{
	@Input() routeNumber: number;
	@Input() canAdd: boolean;
	@Input() canRemove: boolean;
	@Input() rangeDateMode: boolean;
	@Input() minDate: Date;

	@Output() onCityFromChange: EventEmitter<City>;
	@Output() onCityToChange: EventEmitter<City>;
	@Output() onDepartureDateChange: EventEmitter<Date>;
	@Output() onReturnDateChange: EventEmitter<Date>;
	@Output() onAdd: EventEmitter<void>;
	@Output() onRemove: EventEmitter<void>;

	@ViewChild('calendar') calendarControl: H21TwoMonthCalendarComponent;

	maxDate: Date;
	cityFromControl: FormControl;
	cityToControl: FormControl;
	filteredCities: Observable<City[]>;

	private _cityFrom: City;
	private _cityTo: City;
	private _departureDate: Date;
	private _returnDate: Date;
	@Input() get cityFrom(): City {
		return this._cityFrom;
	} set cityFrom(value: City) {
		this._cityFrom = value;
	}
	@Input() get cityTo(): City {
		return this._cityTo;
	} set cityTo(value: City) {
		this._cityTo = value;
	}
	@Input() get departureDate(): Date {
		return this._departureDate;
	} set departureDate(value: Date) {
		this._departureDate = value;
		this._appSubscriber.departureDateChanged({
			routeNumber: this.routeNumber,
			date: this._departureDate
		});
	}
	@Input() get returnDate(): Date {
		return this._returnDate;
	} set returnDate(value: Date) {
		this._returnDate = value;
	}

	constructor(private _vocabulary: VocabularyService,
				private _appSubscriber: AppSubscriberService) {
		this.init();
	}

	init(): void {
		this.routeNumber = 1;
		this.canAdd = true;
		this.canRemove = false;
		this.rangeDateMode = false;
		this.cityFromControl = new FormControl('', Validators.required);
		this.cityToControl = new FormControl('', Validators.required);
		this.onCityFromChange = new EventEmitter<City>();
		this.onCityToChange = new EventEmitter<City>();
		this.onDepartureDateChange = new EventEmitter<Date>();
		this.onReturnDateChange = new EventEmitter<Date>();
		this.onAdd = new EventEmitter<void>();
		this.onRemove = new EventEmitter<void>();
	}

	get invalid(): boolean {
		return this.cityFromControl.invalid || this.cityToControl.invalid || this.calendarControl.invalid;
	}

	validate(): void {
		this.cityFromControl.updateValueAndValidity();
		this.cityToControl.updateValueAndValidity();
		this.cityFromControl.markAsTouched();
		this.cityToControl.markAsTouched();
		this.calendarControl.validate();
	}

	ngOnInit() {
		this.cityFromControl.valueChanges.subscribe(value => {
			this.filteredCities = this._vocabulary.getCities(value);
		});

		this.cityToControl.valueChanges.subscribe(value => {
			this.filteredCities = this._vocabulary.getCities(value);
		});

		this._appSubscriber.departureDateObservable()
			.subscribe(value => {
				setTimeout(() => {
					if (value.routeNumber == this.routeNumber - 1) {
						this.minDate = value.date;
					} else if (value.routeNumber == this.routeNumber + 1) {
						this.maxDate = value.date;
					}
				});
			});
		if (this.cityFrom) {
			this.cityFromControl.setValue(this.cityFrom);
		}
		if (this.cityTo) {
			this.cityToControl.setValue(this.cityTo);
		}
	}

	displayCity(city: City): string {
		return city ? city.name : null;
	}

	onSelectFromItem($event): void {
		if ($event) {
			this.cityFrom = $event.source.value;
			this.onCityFromChange.emit(this._cityFrom);
		}
	}

	onSelectToItem($event): void {
		if ($event) {
			this.cityTo = $event.source.value;
			this.onCityToChange.emit(this._cityTo);
		}
	}

	changeDepartureDate($event): void {
		if ($event) {
			this.departureDate = $event;
			this.onDepartureDateChange.emit(this._departureDate);
		}
	}

	changeReturnDate($event): void {
		if ($event) {
			this.returnDate = $event;
			this.onReturnDateChange.emit(this._returnDate);
		}
	}

	swapCities(): void {
		var tmp = this._cityTo;
		this.cityTo = this._cityFrom;
		this.cityFrom = tmp;
		this.cityFromControl.setValue(this.cityFrom);
		this.cityToControl.setValue(this.cityTo);
		this.onCityFromChange.emit(this._cityFrom);
		this.onCityToChange.emit(this._cityTo);
	}
}
