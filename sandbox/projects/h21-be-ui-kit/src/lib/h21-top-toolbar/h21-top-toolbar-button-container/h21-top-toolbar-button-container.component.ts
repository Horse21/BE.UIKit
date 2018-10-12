import {Component, Input} from '@angular/core';
import {IToolbarElement} from '../../../dto/i-toolbar-element';

@Component({
	selector: 'h21-top-toolbar-button-container',
	templateUrl: './h21-top-toolbar-button-container.component.html',
})
export class H21TopToolbarButtonContainerComponent {

	@Input() buttons: IToolbarElement[];

	constructor() {
		this.buttons = [];
	}
}
