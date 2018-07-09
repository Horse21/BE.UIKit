import {Component} from "@angular/core"

import 'prismjs/prism';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';

declare var Prism;

@Component({
	selector: 'button-toggle-docs',
	templateUrl: './button-toggle-docs.component.html',
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
		let code = `
<mat-button-toggle-group class="${this.confColor} ${this.confSize} ${this.confWidth}"${this.confDisable ? ' [disabled]="true"' : ''}${this.confVerticalOrientation ? ' [vertical]="true"' : ''}>
    <mat-button-toggle value="1" [checked]="true">Button 1</mat-button-toggle>${this.confShowDivider ? this.confVerticalOrientation ? '\n    <mat-divider></mat-divider>' : '\n    <mat-divider [vertical]="true"></mat-divider>' : ''}
    <mat-button-toggle value="2" [checked]="true">Button 2</mat-button-toggle>${this.confShowDivider ? this.confVerticalOrientation ? '\n    <mat-divider></mat-divider>' : '\n    <mat-divider [vertical]="true"></mat-divider>' : ''}
    <mat-button-toggle value="3" [checked]="true">Button 3</mat-button-toggle>${this.confShowDivider ? this.confVerticalOrientation ? '\n    <mat-divider></mat-divider>' : '\n    <mat-divider [vertical]="true"></mat-divider>' : ''}
    <mat-button-toggle value="4" [checked]="true">Button 4</mat-button-toggle>
</mat-button-toggle-group>`;
		return code.trim();
	}

	highlightCode(code: String): String {
		return Prism.highlight(code, Prism.languages.html);
	}
}
