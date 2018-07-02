import {Component, Input, ViewEncapsulation} from "@angular/core";

import 'prismjs/prism';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';

@Component ({
	selector: 'docs-example-viewer',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './docs-example-viewer.component.html',
})

export class DocsExampleViewerComponent {
	@Input() title: string;
	@Input() htmlCodePath: string;
	@Input() tsCodePath: string;
	@Input() cssCodePath: string;

	viewExampleCode: boolean = false;

	constructor () {

	}

	viewExampleCodeTogle() {
		this.viewExampleCode = !this.viewExampleCode;
	}
}
