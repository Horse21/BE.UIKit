import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppSubscriberService } from '../../services/app-subscriber-service';
import { trigger, state, transition, animate, style } from "@angular/animations";
import { IBreadcrumb } from '../../dto/i-breadcrumb';
import { IToolbarElement } from '../../dto/i-toolbar-element';
import { IComboboxOption } from "../../dto/i-combobox-option";

@Component({
	selector: 'h21-top-toolbar',
	templateUrl: './h21-top-toolbar.component.html',
	animations: [
		trigger('toggleVisibility', [
			state('void', style({ opacity: 0 })),
			state('enter', style({ opacity: 1 })),
			state('leave',style({ opacity: 0 })),
			transition('* => *', animate('100ms')),
		])
	]
})

export class H21TopToolbarComponent implements OnInit {

	@Input() showBreadcrumbs: boolean = false;
	@Input() breadcrumbsData: Array<IBreadcrumb>;
	@Input() buttonsData: Array<IToolbarElement>;
	@Input() showSearchResultViewModeToggle: boolean = false;
	@Input() showCart: boolean = false;
	@Input() showSidenavToggle: boolean = false;
	@Input() sidenavToggleDisabled: boolean = false;
	@Input() sidenavOpened: boolean = false;
	@Input() showLanguageControl = false;
	@Input() showCurrencyControl = false;
	@Input() showProfileUserCardActions: boolean = false;
	@Input() showProfileAgentsActions: boolean = false;
	@Input() showProfileAgentAddActions: boolean = false;
	@Input() showProfileTuneActions: boolean = false;
	@Input() showProfileListActions: boolean = false;
	@Output() onSidenavToggle: EventEmitter <void> = new EventEmitter<void>();

	resultsMode = 'list';
	modeVisibility = false;

	languageOptions: IComboboxOption[];
	currencyOptions: IComboboxOption[];
	languageOptionsTooltipText: string;
	currencyOptionsTooltipText: string;
	selectedLanguage: any;
	selectedCurrency: any;

	constructor(private _appSubscriber: AppSubscriberService) {
		this.testInit();
		this.languageOptionsTooltipText = 'Select language';
		this.currencyOptionsTooltipText = 'Select currency';
		this.selectedLanguage = 2;
		this.selectedCurrency = 978;
	}

	public ngOnInit(): void {
		this._appSubscriber.searchObservable().subscribe(options => {
			if (options) {
				this.modeVisibility = true;
				this.resultsMode = 'list';
			} else {
				this.modeVisibility = false;
			}
		});
	}

	sidenavToggle(): void {
		this.sidenavOpened = !this.sidenavOpened;
		this.onSidenavToggle.emit();
	}

	changeResultMode() {
		this._appSubscriber.searchResultMode(this.resultsMode);
	}

	testInit() {
		this.languageOptions = [
			{value: 1, valueLabel: 'DEU', optionLabel: 'German (Deutsch)'},
			{value: 2, valueLabel: 'ENG', optionLabel: 'English (English)'},
			{value: 3, valueLabel: 'FRA', optionLabel: 'French (Français)'},
			{value: 4, valueLabel: 'RUS', optionLabel: 'Russian (Русский)'}
		];

		this.currencyOptions = [
			{value: 978, valueLabel: 'EUR', optionLabel: 'EUR (Euro)'},
			{value: 840, valueLabel: 'USD', optionLabel: 'USD (US Dollar)'},
			{value: 643, valueLabel: 'RUB', optionLabel: 'RUB (Russian Ruble)'},
			{value: 826, valueLabel: 'GBP', optionLabel: 'GBP (United kingdom Pound)'},
			{value: 392, valueLabel: 'JPY', optionLabel: 'JPY (Japanese Yen)'},
			{value: 710, valueLabel: 'ZAR', optionLabel: 'ZAR (South African Rand)'},
		];
	}
}
