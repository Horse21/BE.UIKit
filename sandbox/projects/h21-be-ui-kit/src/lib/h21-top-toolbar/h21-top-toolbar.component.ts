import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppSubscriberService } from '../../services/app-subscriber-service';
import { trigger, state, transition, animate, style } from "@angular/animations";
import { IBreadcrumb } from '../../dto/i-breadcrumb';

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
	@Input() showSearchResultViewModeToggle: boolean = false;

	@Input() showSidenavToggle: boolean = false;
	@Input() sidenavOpened: boolean = false;

	@Input() showLanguageControl = false;
	@Input() showCurrencyControl = false;

	@Input() showProfileUserCardActions: boolean = false;
	@Input() showProfileAgentsActions: boolean = false;
	@Input() showProfileAgentAddActions: boolean = false;
	@Input() showProfileTuneActions: boolean = false;
	@Input() showProfileListActions: boolean = false;

	@Output() onSidenavToggle: EventEmitter <void> = new EventEmitter<void>();

	constructor(private _appSubscriber: AppSubscriberService) {
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

	selectedLanguage = 'eng';
	selectedCurrency = 'eur';
	resultsMode = 'list';
	modeVisibility = false;

	sidenavToggle(): void {
		this.sidenavOpened = !this.sidenavOpened;
		this.onSidenavToggle.emit();
	}

	changeResultMode() {
		this._appSubscriber.searchResultMode(this.resultsMode);
	}
}
