import {Component} from "@angular/core"
import {HttpClient} from '@angular/common/http';

@Component({
	selector: 'colors-docs',
	templateUrl: './colors-docs.component.html'
})

export class ColorsDocsComponent {
	/** Section title */
	title: string = 'Colors';

	isDataInit: boolean = false;

	colorsBg: Array<any> = new Array();
	colorsFg: Array<any> = new Array();
	colorsUi: Array<any> = new Array();

	constructor(private _http: HttpClient) {
		this._http.get<any>('./assets/storage/colors.json').subscribe(data => {
			this.colorsUi = data.ui;
			this.colorsFg = data.foreground;
			this.colorsBg = data.background;
			this.isDataInit = true;
		});
	}
}
