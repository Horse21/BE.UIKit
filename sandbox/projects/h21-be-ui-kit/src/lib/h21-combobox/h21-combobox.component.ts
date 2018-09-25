import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FormControl} from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatMenu, MatMenuTrigger} from "@angular/material";

export interface IComboboxOption  {
	value: any;
	valueLabel: string;
	optionLabel: string;
}

@Component({
	selector: 'h21-combobox',
	templateUrl: './h21-combobox.component.html'
})

export class H21ComboboxComponent implements OnInit {

	@Input() disabled: boolean;
	@Input() placeholder: string;
	@Input() value: any;
	@Input() tooltipText: string;
	@Input() xPosition: 'before' | 'after' = 'after';
	@Input() options: IComboboxOption[];
	@Input() optionsUrl: string;
	@Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
	filteredOptions: Observable<IComboboxOption[]>;
	filterControl = new FormControl();
	filteredOptionCount: number;
	selectedOption: IComboboxOption;

	@ViewChild('dropBox') dropBox: MatMenu;
	@ViewChild('dropBoxTrigger') dropBoxTrigger: MatMenuTrigger;

	constructor(private _http: HttpClient) {

	}

	ngOnInit() {
		if (!this.options && this.optionsUrl) {
			this.options = this.getData(this.optionsUrl);
		}
		const index = this.value ? this.options.findIndex((item) => { return item.value == this.value; }) : 0;
		this.selectedOption = index != -1 ? this.options[index] : this.options[0];
		this.filteredOptions = this.filterControl.valueChanges.pipe(
				startWith(''),
				map(value => this._filter(value))
			);
	}

	getData(url: string): IComboboxOption[] {
		let options: IComboboxOption[] = [];
		this._http.get<any>(url).subscribe(data => {
			options = data;
		});
		return options;
	}

	dropBoxClosed(event: any): void {
		this.filterControl.setValue('');
	}

	selectOption(val: any): void {
		this.value = val;
		this.selectedOption = this.options.find((item) => { return item.value == this.value; });
		this.onSelect.emit(this.value);
	}

	private _filter(value: string): IComboboxOption[] {
		const filterValue = value.toLowerCase();
		const filteredOptions = this.options.filter((option) => { return option.optionLabel.toLowerCase().includes(filterValue) });
		this.filteredOptionCount = filteredOptions.length;
		return filteredOptions;
	}
}
