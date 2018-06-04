import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AppSubscriberService } from '../../projects/h21-be-ui-kit/src/services/app-subscriber-service';
import {FakeVocabularyService} from '../services/fake-vocabulary-service';
import {VocabularyService} from '../../projects/h21-be-ui-kit/src/services/vocabulary-service';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './modules/app-material.module';
import {DocsNavigationComponent} from './docs-navigation/docs-navigation.component';
import {DocsComponent} from './docs/docs.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

// H21 components
import {H21HeaderComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-header/h21-header.component';
import {H21TopToolbarComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-top-toolbar/h21-top-toolbar.component';
import {H21SidebarComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-sidebar/h21-sidebar.component';
import {H21SearchPanelComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-search-panel/h21-search-panel.component';
import {H21FlyRouteSelectionComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-search-panel/h21-fly-route-selection.component";
import {H21PassangersSelectComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-search-panel/h21-passangers-select.component";
import {H21SearchResultComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-search-result/h21-search-result.component";
import {H21SearchResultRowComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-search-result-row/h21-search-result-row.component";
import {H21FilterPanelComponent} from './h21-filter-panel/h21-filter-panel.component';
import {H21SidebarHistoryPanelComponent} from './h21-sidebar-history-panel/h21-sidebar-history-panel.component';
import {H21BreadcrumbsComponent} from './../../projects/h21-be-ui-kit/src/lib/h21-breadcrumbs/h21-breadcrumbs.component';
import {H21UserCardComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-user-card/h21-user-card.component';
import {H21RightOverlayPanelComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-right-overlay-panel/h21-right-overlay-panel.component';
import {H21HeaderUserSelectorDialogComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-header/h21-header-user-selector-dialog.component';
import {H21PassangersSearchComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-passangers-search/h21-passangers-search.component';

// Examples
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
import {H21RightOverlayPanelService} from "../../projects/h21-be-ui-kit/src/lib/h21-right-overlay-panel/h21-right-overlay-panel.service";


const routes: Routes = [
	{path: 'docs', component: DocsComponent },
	{path: 'style/:', component: DocsNavigationComponent },
	{path: 'components/:', component: DocsNavigationComponent },
	{path: 'demo',  component: AppComponent },
	{path: '', redirectTo: '/', pathMatch: 'full'},
	{path: '**', redirectTo: '/'}
];

@NgModule({
	declarations: [
		AppComponent,
		H21HeaderComponent,
		H21TopToolbarComponent,
		H21SidebarComponent,
		H21SearchPanelComponent,
		H21SearchResultComponent,
		H21SearchResultRowComponent,
		H21FlyRouteSelectionComponent,
		H21PassangersSelectComponent,
		H21FilterPanelComponent,
		H21SidebarHistoryPanelComponent,
		H21BreadcrumbsComponent,
		H21HeaderUserSelectorDialogComponent,
		H21UserCardComponent,
		H21RightOverlayPanelComponent,
		H21PassangersSearchComponent,
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
		IconExampleDialogComponent
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
	providers: [
		{provide: VocabularyService, useValue: new FakeVocabularyService()},
		H21RightOverlayPanelService,
		AppSubscriberService
	],
	bootstrap: [AppComponent],
	entryComponents: [IconExampleDialogComponent, H21HeaderUserSelectorDialogComponent, H21RightOverlayPanelComponent]
})

export class AppModule {

}
