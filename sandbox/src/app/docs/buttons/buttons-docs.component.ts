import {Component} from "@angular/core"

@Component({
	selector: 'buttons-docs',
	templateUrl: './buttons-docs.component.html'
})

export class ButtonsDocsComponent {
	/** Section title */
	title = 'Buttons';

	typeVal: String = 'button';
	colorVal: String = '';
	sizeVal: String = '';
}
