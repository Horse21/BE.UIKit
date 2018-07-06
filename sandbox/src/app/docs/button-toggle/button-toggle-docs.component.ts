import {Component} from "@angular/core"

@Component({
	selector: 'button-toggle-docs',
	templateUrl: './button-toggle-docs.component.html'
})

export class ButtonToggleDocsComponent {
	/** Section title */
	title = 'Button toggle';

	confShowDivider: boolean = true;
	confColor: String = '';
	confSize: String = '';
	confWidth: String = '';
	confDisable: boolean = false;
	confVerticalOrientation: boolean = false;
}
