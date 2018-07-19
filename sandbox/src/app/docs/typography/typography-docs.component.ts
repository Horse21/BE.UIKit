import {Component} from "@angular/core"
import {HttpClient} from "@angular/common/http";

@Component({
	selector: 'typography-docs',
	templateUrl: './typography-docs.component.html'
})

export class TypographyDocsComponent {
	/** Section title */
	title = 'Typography';

	isDataInit: boolean = false;

	colorsFg: Array<any> = new Array();
	cssModifiers: Array<any> = new Array();

	constructor(private _http: HttpClient) {
		this._http.get<any>('../../assets/storage/colors.json').subscribe(data => {
			this.colorsFg = data.foreground;
			this.isDataInit = true;
		});

		this._http.get<any>('../../assets/storage/typography.json').subscribe(data => {
			this.cssModifiers = data.modifiers;
			this.isDataInit = true;
		});
	}
}
