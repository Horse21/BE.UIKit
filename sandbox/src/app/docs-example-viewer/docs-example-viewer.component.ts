import {Component, AfterViewInit, Input} from "@angular/core";
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {catchError, map} from 'rxjs/operators';
import {throwError} from "rxjs";

import * as Prism from 'prismjs';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';

@Component({
	selector: 'docs-example-viewer',
	templateUrl: './docs-example-viewer.component.html',
})

export class DocsExampleViewerComponent implements AfterViewInit {

	/** Заголовок */
	@Input() title: string;
	/** Путь к файлу c примером HTML кода */
	@Input() pathToHtml: string;
	/** Путь к файлу c примером Type Script кода */
	@Input() pathToTs: string;
	/** Путь к файлу c примером CSS кода */
	@Input() pathToCss: string;

	/**
	 * @type {boolean} Указывает отображаются или скрыты примеры кода.
	 */
	viewExampleCode: boolean = false;

	/**
	 * @type {string} HTML код примера.
	 */
	codeHtml: string = "";
	/**
	 * @type {string} TypeScript код примера.
	 */
	codeTs: string = "";
	/**
	 * @type {string} CSS код примера.
	 */
	codeCss: string = "";

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

	/**
	 * Делает запрос содержимого удаленного файла и возвращает объект Observable для дальнейшего асинхронного получения
	 * данных.
	 * @param {string} path Путь к файлу.
	 * @returns {Observable<any>} объект Observable.
	 */
	private getRemoteContent(path: string): Observable<any> {
		return this._http.get(path, {responseType: 'text'}).pipe(map(res => res)).pipe(catchError(this.handleError));
	}

	/**
	 * Получает содеримое удаленного файла, осуществляет подцветку синтаксиса согласно указанноого языка программирования
	 * (поддерживаются HTML, TS и CSS).
	 * @param {string} path Путь к файлу.
	 * @param {string} lang Язык для подцветки синтаксиса, возможные значения - 'HTML', 'TS' и 'CSS'. По умолчаниу равен 'HTML'.
	 */
	getContent(path: string, lang: string = 'HTML') {
		lang = lang.toUpperCase();
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
	 * Изменяет видимость примеров кода (скрывает/отображает).
	 */
	viewExampleCodeToggle() {
		this.viewExampleCode = !this.viewExampleCode;
	}

	/**
	 * Преобразует переданную строку кода в HTML разметку с реализованной на базе PrismJS подцветкой синтаксиа.
	 * @param {string} Програмный код.
	 * @param {string} Язык для подцветки синтаксиса, возможные значения - 'HTML', 'TS' и 'CSS'. По умолчаниу равен 'HTML'.
	 * @returns {string} HTML разметка с подсветкой синтаксиса PrismJS.
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
