import {Component} from "@angular/core"

@Component({
	selector: 'buttons-docs',
	templateUrl: './buttons-docs.component.html'
})

export class ButtonsDocsComponent {
	/** Section title */
	title = 'Buttons';

	buttonType: String = 'mat-button';
	buttonColor: String = '';
	buttonSize: String = '';
	buttonDisable: boolean = false;

}
