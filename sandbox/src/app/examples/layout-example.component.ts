import { Component } from "@angular/core"

@Component({
  selector: 'layout-example',
  template: `
  <section class="docs mat-typography">
    <h1>{{title}}</h1>
  </section>`
})

export class LayoutExampleComponent {
  title = 'Layout';
}
