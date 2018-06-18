import { Component, Injector, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {map, startWith, debounceTime } from 'rxjs/internal/operators';
import {City} from '../../dto/city';
import {Observable} from 'rxjs/index';
import {VocabularyService} from '../../services/vocabulary-service';

@Component({
  selector: 'h21-fly-route-selection',
  templateUrl: './h21-fly-route-selection.component.html'
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
			console.log($event);
			this.cityFromChange.emit(this._cityFrom);
		}
	}

	onSelectToItem($event) {
		if ($event) {
			this.cityTo = $event.source.value;
			this.cityToChange.emit(this._cityTo);
		}
	}
}


