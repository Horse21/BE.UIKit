import {Component, Input} from "@angular/core"
import {IBreadcrumb} from "./dto/i-breadcrumb";
import {H21BreadcrumbsLinkMode} from "./h21-breadcrumbs-link-mode.enum";

@Component({
	selector: 'h21-breadcrumbs',
	templateUrl: './h21-breadcrumbs.component.html'
})

export class H21BreadcrumbsComponent {

	/** Specifies whether the last element should be a link */
	@Input() lastIsLink: boolean = false;

	/** An array of breadcrumbs in the form of objects { url: '', label: ''} */
	@Input() breadcrumbsData: Array<IBreadcrumb>;

	/** The way to go by link. The possible values are 'href' and 'routerLink' */
	@Input() linkMode: H21BreadcrumbsLinkMode;

	constructor () {
		this.init();
	}

	init() {
		this.lastIsLink = false;
		this.linkMode = H21BreadcrumbsLinkMode.RouterLink;
	}

	showHrefLinkButton(isLast: boolean): boolean {
		return this.linkMode == H21BreadcrumbsLinkMode.Href && (!isLast || this.lastIsLink);
	}

	showRouterLinkButton(isLast: boolean): boolean {
		return this.linkMode == H21BreadcrumbsLinkMode.RouterLink && (!isLast || this.lastIsLink);
	}
}
