import { Component } from "@angular/core"

@Component({
  selector: 'typography-example',
  template: `    
  <section class="docs mat-typography">
    <h1 class="mat-headline">{{title}}</h1>
    <p class="mat-body-1">Description of the section</p>
    <h2 class="mat-title">Levels of typography</h2>
    <table class="docs_table">
      <thead>
      <tr>
        <th>Description</th>
        <th>Code</th>
        <th>Example</th>
      </tr>
      </thead>
      <tbody>
        <tr>
          <td>Large, one-off headers, usually at the top of the page</td>
          <td class="docs_code-inline">&lt;p class="mat-display-4"&gt;display-4&lt;/p&gt;</td>
          <td><p class="mat-display-4 __nowrap">display-4</p></td>
        </tr>
        <tr>
          <td>Large, one-off headers, usually at the top of the page</td>
          <td class="docs_code-inline">&lt;p class="mat-display-3"&gt;display-3&lt;/p&gt;</td>
          <td><p class="mat-display-3 __nowrap">display-3</p></td>
        </tr>
        <tr>
          <td>Large, one-off headers, usually at the top of the page</td>
          <td class="docs_code-inline">&lt;p class="mat-display-2"&gt;display-2&lt;/p&gt;</td>
          <td><p class="mat-display-2 __nowrap">display-2</p></td>
        </tr>
        <tr>
          <td>Large, one-off headers, usually at the top of the page</td>
          <td class="docs_code-inline">&lt;p class="mat-display-1"&gt;display-1&lt;/p&gt;</td>
          <td><p class="mat-display-1 __nowrap">display-1</p></td>
        </tr>      
        <tr>
          <td>Section heading corresponding to the &lt;h1&gt; tag.</td>
          <td class="docs_code-inline">&lt;h1 class="mat-headline"&gt;headline&lt;/h1&gt;</td>
          <td><h1 class="mat-headline">headline</h1></td>
        </tr>
        <tr>
          <td>Section heading corresponding to the &lt;h2&gt; tag</td>
          <td class="docs_code-inline">&lt;h2 class="mat-title"&gt;title&lt;/h2&gt;</td>
          <td><h2 class="mat-title">title</h2></td>
        </tr>
        <tr>
          <td>Section heading corresponding to the &lt;h3&gt; tag</td>
          <td class="docs_code-inline">&lt;h3 class="mat-subheading-2"&gt;subheading-2&lt;/h3&gt;</td>
          <td><h3 class="mat-subheading-2">subheading-2</h3></td>
        </tr>
        <tr>
          <td>Section heading corresponding to the &lt;h4&gt; tag</td>
          <td class="docs_code-inline">&lt;h4 class="mat-subheading-1"&gt;subheading-2&lt;/h4&gt;</td>
          <td><h4 class="mat-subheading-1">subheading-1</h4></td>
        </tr>
        <tr>
          <td>Base body text</td>
          <td class="docs_code-inline">&lt;p class="mat-body-1"&gt;body-1&lt;/p&gt;</td>
          <td><p class="mat-body-1 __nowrap">body-1</p></td>
        </tr>
        <tr>
          <td>Bolder body text</td>
          <td class="docs_code-inline">&lt;p class="mat-body-2"&gt;body-2&lt;/p&gt;</td>
          <td><p class="mat-body-2 __nowrap">body-2</p></td>
        </tr>
        <tr>
          <td>Smaller body and hint text</td>
          <td class="docs_code-inline">&lt;p class="mat-caption"&gt;caption&lt;/p&gt;</td>
          <td><p class="mat-body-2 __nowrap">caption</p></td>
        </tr>
      </tbody>
    </table>
    <h2>Text colors</h2>
    <table class="docs_table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Color</th>
        <th>Hex</th>
        <th>RGBA</th>
        <th>Code name</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Text primary</td>
        <td><div class="docs_color-preview docs_color-preview__h21-color-text-primary"></div></td>
        <td>#000000</td>
        <td>0 0 0 100</td>
        <td>h21-color-text-primary</td>
      </tr>
      </tbody>
    </table>
  </section>`
})

export class TypographyExampleComponent {
  title = 'Typography';
}
