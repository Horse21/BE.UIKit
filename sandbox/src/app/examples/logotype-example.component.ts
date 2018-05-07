import { Component } from "@angular/core"

@Component({
  selector: 'logotype-example',
  template: `
  <section class="docs mat-typography">
    <h1>{{title}}</h1>
    <p></p>
    <mat-grid-list cols="2" class="docs_grid">
      <mat-grid-tile>
        <figure class="logo-preview">
          <p><img src="/assets/img/h21-logothype-white.svg" alt=""></p>
          <figcaption>
            <a href="#">
              <mat-icon>file_download</mat-icon>
              <span>h21-logo-white.svg</span>
            </a>
          </figcaption>
        </figure>
      </mat-grid-tile>
      <mat-grid-tile>
        <figure class="logo-preview">
          <p><img src="/assets/img/h21-logothype-black.svg" alt="" /></p>
          <figcaption>
            <a href="#">
              <mat-icon>file_download</mat-icon>
              <span>h21-logo-black.svg</span>
            </a>
          </figcaption>
        </figure>
      </mat-grid-tile>
      <mat-grid-tile>
        <figure class="logo-preview">
          <p><img src="/assets/img/h21-logothype-white.svg" alt="" /></p>
          <figcaption>
            <a href="#">
              <mat-icon>file_download</mat-icon>
              <span>h21-logo-white-with-label.svg</span>
            </a>
          </figcaption>
        </figure>
      </mat-grid-tile>
      <mat-grid-tile>
        <figure class="logo-preview">
          <p><img src="/assets/img/h21-logothype-black.svg" alt="" /></p>
          <figcaption>
            <a href="#">
              <mat-icon>file_download</mat-icon>
              <span>h21-logo-white-with-label.svg</span>
            </a>
          </figcaption>
        </figure>
      </mat-grid-tile>
    </mat-grid-list>
  </section>`
})

export class LogotypeExampleComponent {
  title = 'Logotype';
}
