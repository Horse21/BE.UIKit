import {Component} from "@angular/core"
import 'prismjs/prism';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';

declare var Prism;

@Component({
	selector: 'buttons-docs',
	templateUrl: './buttons-docs.component.html'
})

export class ButtonsDocsComponent {
	/** Section title */
	title = 'Buttons';

	confType: String = 'mat-button';
	confColor: String = '';
	confSize: String = '';
	confDisable: boolean = false;
	confCodeSample: String = '';

	constructor () {

	}

	ngOnInit() {
		this.updateCodeSample();
	}

	updateCodeSample() {
		this.confCodeSample = this.highlightCode(this.getCodeSample());
	}

	getCodeSample(): String {
		return `<button ${this.confType}${this.confColor != '' ? ` color="${this.confColor}"` : ''}${this.confSize != '' ? ` class="${this.confSize}"` : ''}${this.confDisable ? ' disabled' : ''}>Button</button>`;
	}

	highlightCode(code: String): String {
		return Prism.highlight(code, Prism.languages.html);
	}
}
