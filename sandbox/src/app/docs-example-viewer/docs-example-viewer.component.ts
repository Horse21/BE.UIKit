import {Component, Input} from "@angular/core";
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {catchError, map} from 'rxjs/operators';
import {throwError} from "rxjs/index";

import * as Prism from 'prismjs';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';

@Component({
	selector: 'docs-example-viewer',
	templateUrl: './docs-example-viewer.component.html',
})

export class DocsExampleViewerComponent {

	/** Заголовок */
	@Input() title: string;
	/** Путь к файлу c примером HTML кода */
	@Input() pathToHtml: string;
	/** Путь к файлу c примером Type Script кода */
	@Input() pathToTs: string;
	/** Путь к файлу c примером CSS кода */

	@Input() pathToCss: string;

	/**
	 * Индикатор видимости
	 * @type {boolean}
	 */
	viewExampleCode: boolean = false;

	codeHtml: string = "";
	codeTs: string = "";
	codeCss: string = "";

	private _code;

	constructor(private _http: HttpClient) {
	}

	ngAfterViewInit() {
		if (this.pathToHtml) {
			this.getContent(this.pathToHtml, 'HTML');
		}
		if (this.pathToTs) {
			this.getContent(this.pathToTs, 'TS');
		}
		if (this.pathToCss) {
			this.getContent(this.pathToCss, 'CSS');
		}
	}

	getRemoteContent(path: string): Observable<any> {
		return this._http.get(path, {responseType: 'text'}).pipe(map(res => res)).pipe(catchError(this.handleError));
	}

	getContent(path: string, lang: string) {
		this.getRemoteContent(path).subscribe(data => {
			switch (lang) {
				case 'TS':
					this.codeTs = DocsExampleViewerComponent.highlightCode(data, 'TS');
					break;
				case 'CSS':
					this.codeCss = DocsExampleViewerComponent.highlightCode(data, 'CSS');
					break;
				default :
					this.codeHtml = DocsExampleViewerComponent.highlightCode(data, 'Html');
			}
		})
	}

	private handleError(error: any): any {
		let errMsg: string;
		if (error instanceof fetch) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		return throwError(errMsg);
	}

	/**
	 *
	 */
	viewExampleCodeToggle() {
		this.viewExampleCode = !this.viewExampleCode;
	}

	/**
	 *
	 * @param {string} Програмный код
	 * @param {string} Язык кода
	 * @returns {string} Строка с HTML разметкой
	 */
	private static highlightCode(code: string, lang: string = 'HTML'): string {
		if (code) {
			switch (lang) {
				case 'TS':
					return Prism.highlight(code, Prism.languages.typescript);
				case 'CSS':
					return Prism.highlight(code, Prism.languages.css);
				default :
					return Prism.highlight(code, Prism.languages.html);
			}
		}
		return '';
	}
}
