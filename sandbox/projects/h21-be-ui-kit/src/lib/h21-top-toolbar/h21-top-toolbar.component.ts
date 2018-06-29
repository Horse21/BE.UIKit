import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { AppSubscriberService } from '../../services/app-subscriber-service';
import { trigger, state, transition, animate, style } from "@angular/animations";

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

	@Output() onMenuClick: EventEmitter <void> = new EventEmitter<void>();

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
		this._appSubscriber.closeMenuObservable().subscribe(()=>{
			this.menuIsOpened = false;
		});
	}

	menuIsOpened = true;
	selectedLanguage = 'eng';
	selectedCurrency = 'eur';
	resultsMode = 'list';
	modeVisibility = false;

	menuClick(): void {
		this.menuIsOpened = !this.menuIsOpened;
		this.onMenuClick.emit();
	}

	changeResultMode() {
		this._appSubscriber.searchResultMode(this.resultsMode);
	}
}
