import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'h21-top-toolbar',
  templateUrl: './h21-top-toolbar.component.html'
})

export class H21TopToolbarComponent {

	@Output () onMenuClick: EventEmitter <void> = new EventEmitter<void>();

	menuIsOpened = false;
	selectedLanguage = 'eng';
	selectedCurrency = 'eur';

	menuClick(): void {
		this.menuIsOpened = !this.menuIsOpened;
		this.onMenuClick.emit();
	}
}
