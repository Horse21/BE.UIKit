import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './modules/app-material.module';
import {H21DocsNavigationComponent} from './h21-docs-navigation/h21-docs-navigation.component';
import {DocsComponent} from './docs/docs.component';
import {H21HeaderComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-header/h21-header.component';
import {H21BreadcrumbsComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-breadcrumbs/h21-breadcrumbs.component';
import {H21SidebarComponent} from './h21-sidebar/h21-sidebar.component';
import {ExampleViewerComponent} from './example-viewer/example-viewer.component';
import {HttpClientModule} from '@angular/common/http';
// Examples .
import {ButtonsExampleComponent} from './examples/buttons-example.component';
import {ColorsExampleComponent} from './examples/colors-example.component';
import {FormsExampleComponent} from './examples/forms-example.component';
import {GridExampleComponent} from './examples/grid-example.component';
import {IconsExampleComponent} from './examples/icons-example.component';
import {ImagesExampleComponent} from './examples/images-example.component';
import {LayoutExampleComponent} from './examples/layout-example.component';
import {LogotypeExampleComponent} from './examples/logotype-example.component';
import {SearchComponentsExampleComponent} from './examples/search-components-example.component';
import {TabsExampleComponent} from './examples/tabs-example.component';
import {TooltipsExampleComponent} from './examples/tooltips-example.component';
import {TypographyExampleComponent} from './examples/typography-example.component';
import {IconExampleDialogComponent} from './examples/icon-example-dialog.component';
import {FormsModule} from "@angular/forms";
// . Examples

const routes: Routes = [
	{path: 'docs', component: DocsComponent },
	{path: 'style/:', component: H21DocsNavigationComponent },
	{path: 'components/:', component: H21DocsNavigationComponent },
	{path: 'demo',  component: LogotypeExampleComponent },
	{path: 'demo/:',  component: LogotypeExampleComponent },
	{path: '', redirectTo: '/', pathMatch: 'full'},
	{path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    H21HeaderComponent,
    H21SidebarComponent,
    H21BreadcrumbsComponent,
	H21DocsNavigationComponent,
    DocsComponent,
    ExampleViewerComponent,
    ButtonsExampleComponent,
    ColorsExampleComponent,
    FormsExampleComponent,
    GridExampleComponent,
    IconsExampleComponent,
    ImagesExampleComponent,
    LayoutExampleComponent,
    LogotypeExampleComponent,
    SearchComponentsExampleComponent,
    TabsExampleComponent,
    TooltipsExampleComponent,
    TypographyExampleComponent,
    IconExampleDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [IconExampleDialogComponent]
})
export class AppModule {

}
