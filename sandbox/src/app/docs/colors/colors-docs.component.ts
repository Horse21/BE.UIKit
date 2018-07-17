import {Component} from "@angular/core"

@Component({
	selector: 'colors-docs',
	templateUrl: './colors-docs.component.html'
})

export class ColorsDocsComponent {
	/** Section title */
	title: string = 'Colors';
	colorsBg: Array<any> = new Array();
	colorsFg: Array<any> = new Array();
	colorsUi: Array<any> = new Array();

	constructor() {

		// UI colors
		this.colorsUi.push({name: 'UI Primary', cssClass: 'color-example__ui-primary', hex: '#0044d6', rgba: '4 68 214 1', scssName: '$h21-ui-primary'});
		this.colorsUi.push({name: 'UI Primary Light', cssClass: 'color-example__ui-primary-light', hex: '#2c67e6', rgba: '44 102 230 1', scssName: '$h21-ui-primary-light'});
		this.colorsUi.push({name: 'UI Accent', cssClass: 'color-example__ui-accent', hex: '#28a745', rgba: '40 167 69 1', scssName: '$h21-ui-accent'});
		this.colorsUi.push({name: 'UI Accent Light', cssClass: 'color-example__ui-accent-light', hex: '#3dcc5d', rgba: '61 204 93 1', scssName: '$h21-ui-accent-light'});
		this.colorsUi.push({name: 'UI Warn', cssClass: 'color-example__ui-warn', hex: '#ff0000', rgba: '255 0 0 1', scssName: '$h21-ui-warn'});
		this.colorsUi.push({name: 'UI Warn Light', cssClass: 'color-example__ui-warn-light', hex: '#ff5050', rgba: '255 80 80 1', scssName: '$h21-ui-warn-light'});

		// Background colors
		this.colorsBg.push({name: 'Background dark', cssClass: 'color-example__bg-dark', hex: '#27334d', rgba: '39 51 77 1', scssName: '$h21-bg-dark'});
		this.colorsBg.push({name: 'Background light', cssClass: 'color-example__bg-light', hex: '#faf9f9', rgba: '250 249 249 1', scssName: '$h21-bg-light'});
		this.colorsBg.push({name: 'Different UI background dark', cssClass: 'color-example__bg-ashen-blue-dark', hex: '#4f5a7c', rgba: '79 90 124 1', scssName: '$h21-bg-ashen-blue-dark'});
		this.colorsBg.push({name: 'Different UI background light 1', cssClass: 'color-example__bg-ashen-blue-light-1', hex: '#e4ebfb', rgba: '228 235 251 1', scssName: '$h21-bg-ashen-blue-light-1'});
		this.colorsBg.push({name: 'Different UI background light 2', cssClass: 'color-example__bg-ashen-blue-light-2', hex: '#eceef6', rgba: '236 238 246 1', scssName: '$h21-bg-ashen-blue-light-2'});
		this.colorsBg.push({name: 'Different UI background light 3', cssClass: 'color-example__bg-ashen-blue-light-3', hex: '#f0f4fc', rgba: '240 244 252 1', scssName: '$h21-bg-ashen-blue-light-3'});


		this.colorsBg.push({name: 'Background black 1', cssClass: '', hex: '#fbfbfb', rgba: '', scssName: '$h21-bg-gray-1'});
		this.colorsBg.push({name: 'Background black 2', cssClass: '', hex: '#f0f0f0', rgba: '', scssName: '$h21-bg-gray-1'});
		this.colorsBg.push({name: 'Background black 3', cssClass: '', hex: '#ebebeb', rgba: '', scssName: '$h21-bg-gray-1'});
		this.colorsBg.push({name: 'Background black 4', cssClass: '', hex: '#e3e3e3', rgba: '', scssName: '$h21-bg-gray-1'});
		this.colorsBg.push({name: 'Background black 5', cssClass: '', hex: '#b4b4b4', rgba: '', scssName: '$h21-bg-gray-1'});
		this.colorsBg.push({name: 'Background black 6', cssClass: '', hex: '#ababab', rgba: '', scssName: '$h21-bg-gray-1'});
		this.colorsBg.push({name: 'Background black 7', cssClass: '', hex: '#999999', rgba: '', scssName: '$h21-bg-gray-1'});
		this.colorsBg.push({name: 'Background black 8', cssClass: '', hex: '#797979', rgba: '', scssName: '$h21-bg-gray-1'});


		// Text colors
		this.colorsFg.push({name: 'Text Primary', cssClass: 'color-example__text-primary', hex: '#27334d', rgba: '39 51 77 1', scssName: '$h21-fg-base'});
		this.colorsFg.push({name: 'Text Secondary', cssClass: 'color-example__text-ashen-blue', hex: '#4f5a7c', rgba: '79 90 124 1', scssName: '$h21-fg-ashen-blue'});
		this.colorsFg.push({name: 'Text Tetriary', cssClass: 'color-example__text-ashen-blue-light', hex: '#606b8d', rgba: '96 107 141 1', scssName: '$h21-fg-ashen-blue-light'});
		this.colorsFg.push({name: 'Text Gray', cssClass: 'color-example__text-gray', hex: '#757575', rgba: '117 117 117 1', scssName: '$h21-fg-gray'});

		this.colorsFg.push({name: 'Text Black 12', cssClass: 'color-example__text-black-12', hex: '#e2e2e2', rgba: '0 0 0 12', scssName: '$h21-black-12-opacity'});
		this.colorsFg.push({name: 'Text Black 16', cssClass: 'color-example__text-black-16', hex: '#d8d8d8', rgba: '0 0 0 16', scssName: '$h21-black-16-opacity'});
		this.colorsFg.push({name: 'Text Black 26', cssClass: 'color-example__text-black-26', hex: '#bdbdbd', rgba: '0 0 0 26', scssName: '$h21-black-26-opacity'});
		this.colorsFg.push({name: 'Text Black 42', cssClass: 'color-example__text-black-42', hex: '#9b9b9b', rgba: '0 0 0 42', scssName: '$h21-black-42-opacity'});
		this.colorsFg.push({name: 'Text Black 57', cssClass: 'color-example__text-black-57', hex: '#757575', rgba: '0 0 0 57', scssName: '$h21-black-57-opacity'});
		this.colorsFg.push({name: 'Text Black 73', cssClass: 'color-example__text-black-73', hex: '#4a4a4a', rgba: '0 0 0 73', scssName: '$h21-black-73-opacity'});
		this.colorsFg.push({name: 'Text Black 87', cssClass: 'color-example__text-black-87', hex: '#212121', rgba: '0 0 0 87', scssName: '$h21-black-87-opacity'});
	}
}
