import { Component } from "@angular/core"

@Component({
  selector: 'tabs-example',
  template: `
  <section>
    <h1>{{title}}</h1>
    <div class=""></div>
    <div class=""></div>
    <mat-card>
      <mat-card-content>
        <mat-tab-group>
          <mat-tab label="Examples">
            <section>
              <h2 class=""></h2>
              <p class=""></p>
            </section>
          </mat-tab>
          <mat-tab label="Properties">
            <div class="c-example-viewer_code-example">
            </div>
          </mat-tab>
        </mat-tab-group>
      </mat-card-content>
    </mat-card>
  </section>`
})

export class TabsExampleComponent {
  title = 'Tabs';
}
