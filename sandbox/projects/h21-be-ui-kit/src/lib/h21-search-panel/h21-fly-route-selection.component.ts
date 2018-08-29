import { Component, Injector, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import { AppSubscriberService } from '../../services/app-subscriber-service';
import {City} from '../../dto/city';
import {Observable} from 'rxjs';
import {VocabularyService} from '../../services/vocabulary-service';

@Component({
  selector: 'h21-fly-route-selection',
  templateUrl: './h21-fly-route-selection.component.html'
})

export class H21FlyRouteSelectionComponent {
	@Input() routeNumber = 1;
	@Input() canAdd = true;
	@Input() canRemove = false;
	@Input() rangeDateMode = false;

	cityFromControl: FormControl = new FormControl();
	cityToControl: FormControl = new FormControl();
	filteredCities: Observable<City[]>;
	@Input() minDate: Date;
	maxDate: Date;

	@Output() onAdd: EventEmitter<void> = new EventEmitter<void>();
	@Output() onRemove: EventEmitter<void> = new EventEmitter<void>();

	constructor(
		private _vocabulary: VocabularyService,
		private _appSubscriber: AppSubscriberService
	) {
	}

	ngOnInit() {
		this.cityFromControl.valueChanges.subscribe(value => {
			this.filteredCities = this._vocabulary.getCities(value);
		});

		this.cityToControl.valueChanges.subscribe(value => {
			this.filteredCities = this._vocabulary.getCities(value);
		});

		this._appSubscriber.arrivalDateObservable()
			.subscribe(value => {
				setTimeout(() => {
					if (value.routeNumber == this.routeNumber - 1) {
						this.minDate = value.date;
					} else if (value.routeNumber == this.routeNumber + 1) {
						this.maxDate = value.date;
					}
				});
			});
	}

	displayCity(city: City): string {
		return city ? city.name : null;
	}

	public _cityFrom: City;
	public _cityTo: City;
	public _arrivalDate: Date;
	public _returnDate: Date;

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

	@Input() get arrivalDate(): Date {
		return this._arrivalDate;
	}

	set arrivalDate(value: Date) {
		this._arrivalDate = value;
		this._appSubscriber.arrivalDateChanged({
			routeNumber: this.routeNumber,
			date: this.arrivalDate
		});
	}

	@Input() get returnDate(): Date {
		return this._returnDate;
	}

	set returnDate(value: Date) {
		this._returnDate = value;
	}

	@Output('cityFromChange') public cityFromChange: EventEmitter<City> = new EventEmitter<City>();
	@Output('cityToChange') public cityToChange: EventEmitter<City> = new EventEmitter<City>();
	@Output('arrivalDateChange') public arrivalDateChange: EventEmitter<Date> = new EventEmitter<Date>();
	@Output('returnDateChange') public returnDateChange: EventEmitter<Date> = new EventEmitter<Date>();

	onSelectFromItem($event) {
		if ($event) {
			this.cityFrom = $event.source.value;
			this.cityFromChange.emit(this._cityFrom);
		}
	}

	onSelectToItem($event) {
		if ($event) {
			this.cityTo = $event.source.value;
			this.cityToChange.emit(this._cityTo);
		}
	}

	onArrivalDateChange($event) {
		if ($event) {
			this.arrivalDate = $event;
			this.arrivalDateChange.emit(this._arrivalDate);
		}
	}

	onReturnDateChange($event) {
		if ($event) {
			this.returnDate = $event;
			this.returnDateChange.emit(this._returnDate);
		}
	}

	swapCities() {
		var tmp = this._cityTo;
		this.cityTo = this._cityFrom;
		this.cityFrom = tmp;
		this.cityFromChange.emit(this._cityFrom);
		this.cityToChange.emit(this._cityTo);
	}
}