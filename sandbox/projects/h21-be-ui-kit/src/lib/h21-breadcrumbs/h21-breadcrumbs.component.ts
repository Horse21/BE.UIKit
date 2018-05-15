import {Component, Input} from "@angular/core"
import {Breadcrumb} from "./Breadcrumb";

@Component({
  selector: 'h21-breadcrumbs',
  templateUrl: './h21-breadcrumbs.component.html',
  styleUrls: ['./h21-breadcrumbs.component.css']
})

export class H21BreadcrumbsComponent {

  @Input() lastIsLink: boolean = false;
  @Input() showHomeLink: boolean = true;

	breadCrumbs: Array<Breadcrumb> = [
    {label: "test 1", url: "#"},
    {label: "test 2", url: "#"},
    {label: "test 3", url: "#"},
    {label: "test 4", url: "#"}
  ];
}
