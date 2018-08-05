import {Component, Input} from "@angular/core"
import {IBreadcrumb} from "./../../dto/i-breadcrumb";

@Component({
	selector: 'h21-breadcrumbs',
	templateUrl: './h21-breadcrumbs.component.html'
})

export class H21BreadcrumbsComponent {

	@Input() lastIsLink: boolean = false;
	@Input() breadcrumbsData: Array<IBreadcrumb>;

	constructor () {

	}
}
