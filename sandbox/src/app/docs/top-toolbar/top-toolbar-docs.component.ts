import {Component} from "@angular/core"
import {IBreadcrumb} from "./../../../../projects/h21-be-ui-kit/src/dto/i-breadcrumb";

const BREADCRUMBS_DATA: IBreadcrumb[] = [
	{label: "Home", url: "#"},
	{label: "Company", url: "#"},
	{label: "My Company", url: "#"},
	{label: "My User", url: "#"}
];

@Component({
	selector: 'top-toolbar-docs',
	templateUrl: './top-toolbar-docs.component.html'
})

export class TopToolbarDocsComponent {
	/** Section title */
	title = 'Top toolbar component';
	breadcrumbs: Array<IBreadcrumb> = BREADCRUMBS_DATA;
}
