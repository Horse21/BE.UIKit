import {Component, Input} from "@angular/core";
import {Observable, Observer} from 'rxjs';
import { NgxMdService } from 'ngx-md';
import { map } from 'rxjs/operators';
export interface ExampleTab {
	label: string;
	content: string;
}

import 'prismjs/prism';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';

@Component ({
	selector: 'docs-example-viewer',
	templateUrl: './docs-example-viewer.component.html',
})

export class DocsExampleViewerComponent {
	asyncTabs: Observable<ExampleTab[]>;

	@Input() title: string;
	@Input() htmlCodePath: string;
	@Input() tsCodePath: string;
	@Input() cssCodePath: string;

	viewExampleCode: boolean = false;

	constructor (private _markdown: NgxMdService) {
		//console.log(this._markdown.getContent(this.htmlCodePath).);

		this.asyncTabs = Observable.create((observer: Observer<ExampleTab[]>) => {
			setTimeout(() => {
				observer.next([
					{label: 'HTML', content: `<ngx-md [path]="htmlCodePath"> </ngx-md>`},
					{label: 'TS', content: '<ngx-md [path]="tsCodePath"> </ngx-md>'},
					{label: 'CSS', content: '<ngx-md [path]="cssCodePath"> </ngx-md>'},
				]);
			}, 1000);
		});
	}

	ngOnInit() {

	}

	viewExampleCodeToggle() {
		this.viewExampleCode = !this.viewExampleCode;
	}
}
