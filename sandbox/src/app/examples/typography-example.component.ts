import { Component } from "@angular/core"

@Component({
  selector: 'typography-example',
  template: `
  <section class="docs mat-typography">
    <h1>{{title}}</h1>
  </section>`
})

export class TypographyExampleComponent {
  title = 'Typography';
}
