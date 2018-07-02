import {Component} from "@angular/core";

@Component({
  selector: 'search-components-example',
  template: `
	  <section class="docs_section mat-typography">
		  <h1>{{title}}</h1>
	  </section>`
})

export class SearchComponentsExampleComponent {
  title = 'Search components';
}
