import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AppSubscriberService} from '../../services/app-subscriber-service';
import {IBreadcrumb} from '../h21-breadcrumbs/dto/i-breadcrumb';
import {IToolbarElement} from '../../dto/i-toolbar-element';
import {IComboboxOption} from "../../dto/i-combobox-option";
import {IProviderDataLoadingStatistic} from "./dto/i-provider-data-loading-statistic";

@Component({
	selector: 'h21-top-toolbar',
	templateUrl: './h21-top-toolbar.component.html'
})

export class H21TopToolbarComponent {
	@Input() showBreadcrumbs: boolean;
	@Input() breadcrumbsData: Array<IBreadcrumb>;
	@Input() buttonsData: Array<IToolbarElement>;
	@Input() showCart: boolean;
	@Input() showSidenavToggle: boolean;
	@Input() sidenavToggleDisabled: boolean;
	@Input() sidenavOpened: boolean;
	@Input() showLanguageControl: boolean;
	@Input() showCurrencyControl: boolean;
	@Input() showProviderDataLoading: boolean;
	@Input() providerDataLoadingStatistic: IProviderDataLoadingStatistic;

	@Output() onSidenavToggle: EventEmitter<void>;
	@Output() onUpdateSearchResultClick: EventEmitter<void>;

	languageOptionsTooltipText: string;
	currencyOptionsTooltipText: string;
	selectedLanguage: any;
	selectedCurrency: any;
	languageOptions: IComboboxOption[];
	currencyOptions: IComboboxOption[];

	constructor(private _appSubscriber: AppSubscriberService) {
		this.init();
	}

	init() {
		this.showProviderDataLoading = false;
		this.showBreadcrumbs = false;
		this.showCart = false;
		this.showSidenavToggle = false;
		this.sidenavToggleDisabled = false;
		this.sidenavOpened = false;
		this.showLanguageControl = false;
		this.showCurrencyControl = false;
		this.onSidenavToggle = new EventEmitter<void>();
		this.onUpdateSearchResultClick = new EventEmitter<void>();

		this.languageOptionsTooltipText = 'Select language';
		this.currencyOptionsTooltipText = 'Select currency';
		this.selectedLanguage = 2;
		this.selectedCurrency = 978;
		// todo: Do download data from an external source
		this.languageOptions = [
			{value: 1, valueLabel: 'DEU', optionLabel: 'German (Deutsch)'},
			{value: 2, valueLabel: 'ENG', optionLabel: 'English (English)'},
			{value: 3, valueLabel: 'FRA', optionLabel: 'French (Français)'},
			{value: 4, valueLabel: 'RUS', optionLabel: 'Russian (Русский)'}
		];
		// todo: Do download data from an external source
		this.currencyOptions = [
			{value: 978, valueLabel: 'EUR', optionLabel: 'EUR (Euro)'},
			{value: 840, valueLabel: 'USD', optionLabel: 'USD (US Dollar)'},
			{value: 643, valueLabel: 'RUB', optionLabel: 'RUB (Russian Ruble)'},
			{value: 826, valueLabel: 'GBP', optionLabel: 'GBP (United kingdom Pound)'},
			{value: 392, valueLabel: 'JPY', optionLabel: 'JPY (Japanese Yen)'},
			{value: 710, valueLabel: 'ZAR', optionLabel: 'ZAR (South African Rand)'},
		];

	}

	updateSearchResult(): void {
		this.onUpdateSearchResultClick.emit();
	}

	sidenavToggle(): void {
		this.sidenavOpened = !this.sidenavOpened;
		this.onSidenavToggle.emit();
	}
}
