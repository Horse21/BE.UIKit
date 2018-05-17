import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './modules/app-material.module';
import {DocsNavigationComponent} from './docs-navigation/docs-navigation.component';
import {DocsComponent} from './docs/docs.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

// H21 components .
import { H21HeaderComponent } from '../../projects/h21-be-ui-kit/src/lib/h21-header/h21-header.component';
import { H21TopToolbarComponent } from './h21-top-toolbar/h21-top-toolbar.component';
import { H21SidebarComponent } from './h21-sidebar/h21-sidebar.component';
import { H21SidebarSearchComponent } from './h21-sidebar-search/h21-sidebar-search.component';
import { H21SidebarFilterComponent } from './h21-sidebar-filter/h21-sidebar-filter.component';
import { H21SidebarHistoryComponent } from './h21-sidebar-history/h21-sidebar-history.component';
import { H21BreadcrumbsComponent } from './../../projects/h21-be-ui-kit/src/lib/h21-breadcrumbs/h21-breadcrumbs.component';
// . H21 components

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
// . Examples

// Demo pages .
import { SearchPageDemoComponent } from "./demo/search-page-demo.component";
// . Demo pages

import {H21HeaderUserSelectorDialogComponent} from './header-dialog/h21-header-user-selector-dialog.component';


const routes: Routes = [
	{path: 'docs', component: DocsComponent },
	{path: 'style/:', component: DocsNavigationComponent },
	{path: 'components/:', component: DocsNavigationComponent },
	{path: 'demo',  component: SearchPageDemoComponent },
	{path: 'demo/:',  component: SearchPageDemoComponent },
	{path: '', redirectTo: '/', pathMatch: 'full'},
	{path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    H21HeaderComponent,
    H21TopToolbarComponent,
    H21SidebarComponent,
    H21SidebarSearchComponent,
    H21SidebarFilterComponent,
    H21SidebarHistoryComponent,
    H21BreadcrumbsComponent,
	DocsNavigationComponent,
    DocsComponent,
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
    IconExampleDialogComponent,
    SearchPageDemoComponent,
	H21HeaderUserSelectorDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    FormsModule,
	ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [IconExampleDialogComponent, H21HeaderUserSelectorDialogComponent]
})

export class AppModule {

}
