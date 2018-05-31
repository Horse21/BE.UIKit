import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'h21-top-toolbar',
  templateUrl: './h21-top-toolbar.component.html'
})

export class H21TopToolbarComponent {
	@Output() onMenuClick: EventEmitter <void> = new EventEmitter<void>();
	@Output() onChangeResultsMode: EventEmitter <string> = new EventEmitter<string>();

	menuIsOpened = false;
	selectedLanguage = 'eng';
	selectedCurrency = 'eur';
	resultsMode = 'list';
	modeVisibility = false;

	menuClick(): void {
		this.menuIsOpened = !this.menuIsOpened;
		this.onMenuClick.emit();
	}
}
