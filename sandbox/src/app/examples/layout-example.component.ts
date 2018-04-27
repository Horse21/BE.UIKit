import { Component } from "@angular/core"

@Component({
  selector: 'layout-example',
  template: `
  <section class="">
    <h1>{{title}}</h1>
    <div class="example"></div>
    <div class=""></div>
    <mat-card>
      <mat-card-content>
        <mat-tab-group>
          <mat-tab label="Examples">
            <section>
              <button mat-button>Basic</button>
              <button mat-button color="primary">Primary</button>
              <button mat-button color="accent">Accent</button>
              <button mat-button color="warn">Warn</button>
              <button mat-button disabled>Disabled</button>
              <a mat-button routerLink=".">Link</a>
              <br/>
              <button mat-raised-button>Basic</button>
              <button mat-raised-button color="primary">Primary</button>
              <button mat-raised-button color="accent">Accent</button>
              <button mat-raised-button color="warn">Warn</button>
              <br />
              asdfjiasjdfioasjdf sadiofjasd isadh fiasdf asiufdh 
              <br />
              <mat-form-field>
                <input matInput placeholder="Input">
              </mat-form-field>

              <mat-form-field>
                <textarea matInput placeholder="Textarea"></textarea>
              </mat-form-field>

              <mat-form-field>
                <mat-select placeholder="Select">
                  <mat-option value="option">Option</mat-option>
                </mat-select>
              </mat-form-field>
              <h2 class=""></h2>
              <div class="example">
                <div class="example_view"></div>
                <div class="example_code"></div>
              </div>
              
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

export class LayoutExampleComponent {
  title = 'Layout';
}
