import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IToolbarElement} from '../../../dto/i-toolbar-element';

@Component({
	selector: 'h21-top-toolbar-button',
	templateUrl: './h21-top-toolbar-button.component.html',
})
export class H21TopToolbarButtonComponent {

	@Input() data: IToolbarElement;
	@Output() action: EventEmitter<any> = new EventEmitter();

	onClick(event) {
		this.action.emit(this.data.action(event));
	}

	constructor() {

	}
}
