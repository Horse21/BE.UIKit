import { Component, OnInit } from '@angular/core';
import { IBreadcrumb } from './../../../../projects/h21-be-ui-kit/src/dto/i-breadcrumb';
import { IToolbarElement } from '../../../../projects/h21-be-ui-kit/src/dto/i-toolbar-element';
import { EventEmitter } from 'events';

const BREADCRUMBS_DATA: IBreadcrumb[] = [
	{ label: 'Home', url: '#' },
	{ label: 'Company', url: '#' },
	{ label: 'My Company', url: '#' },
	{ label: 'My User', url: '#' }
];

const BUTTON_DATA: IToolbarElement = {
	condition: 'showProfileAgentsActions',
	tooltip: 'lorem',
	icon: 'person',
	style: ['c-h21-top-toolbar_action-btn', 'c-h21-top-toolbar_action-btn__hover-red'],
	action: (event) => {
		alert('lorem');
	}
};

const BUTTONS_DATA: IToolbarElement[] = [
	{
		condition: 'showProfileAgentsActions',
		tooltip: 'lorem',
		icon: 'edit',
		style: ['c-h21-top-toolbar_action-btn', 'c-h21-top-toolbar_action-btn__hover-red'],
		action: (event) => {
			alert('lorem');
		}
	},
	{
		condition: 'showProfileTuneActions',
		tooltip: 'ipsum',
		icon: 'cancel',
		style: ['c-h21-top-toolbar_action-btn', 'c-h21-top-toolbar_action-btn__hover-red'],
		action: (event) => {
			alert('ipsum');
		}
	},
	{
		condition: 'showProfileTuneActions',
		tooltip: 'help',
		icon: 'help',
		style: ['c-h21-top-toolbar_action-btn', 'c-h21-top-toolbar_action-btn__hover-red'],
		action: (event) => {
			alert('dolor');
		}
	}
];

@Component({
	selector: 'top-toolbar-docs',
	templateUrl: './top-toolbar-docs.component.html'
})
export class TopToolbarDocsComponent implements OnInit {
	title = 'Top toolbar component';
	breadcrumbs: Array<IBreadcrumb> = BREADCRUMBS_DATA;
	buttons: Array<IToolbarElement> = BUTTONS_DATA;
	button: IToolbarElement = BUTTON_DATA;

	ngOnInit() {
		console.log('button', this.button);
		console.log('buttons', this.buttons);
	}
}
