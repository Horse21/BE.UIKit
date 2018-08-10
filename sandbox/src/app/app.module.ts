import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppSubscriberService} from '../../projects/h21-be-ui-kit/src/services/app-subscriber-service';
import {OrderService } from '../../projects/h21-be-ui-kit/src/services/order-service';
import {FakeVocabularyService} from '../services/fake-vocabulary-service';
import {VocabularyService} from '../../projects/h21-be-ui-kit/src/services/vocabulary-service';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './modules/app-material.module';
import {DocsNavigationComponent} from './docs-navigation/docs-navigation.component';
import {DocsComponent} from './docs/docs.component';
import {DocsExampleViewerComponent} from './docs-example-viewer/docs-example-viewer.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NouisliderModule} from 'ng2-nouislider';
import {NgxMdModule} from 'ngx-md';

/** Import H21 components */
import {H21HeaderComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-header/h21-header.component';
import {H21TopToolbarComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-top-toolbar/h21-top-toolbar.component';
import {H21SidebarComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-sidebar/h21-sidebar.component';
import {H21SearchPanelComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-search-panel/h21-search-panel.component';
import {H21FlyRouteSelectionComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-search-panel/h21-fly-route-selection.component";
import {H21PassengersSelectComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-search-panel/h21-passengers-select.component";
import {H21SearchResultComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-search-result/h21-search-result.component";
import {H21SearchResultRowComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-search-result-row/h21-search-result-row.component";
import {H21FilterPanelComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-filter-panel/h21-filter-panel.component';
import {H21SidebarHistoryPanelComponent} from './h21-sidebar-history-panel/h21-sidebar-history-panel.component';
import {H21BreadcrumbsComponent} from './../../projects/h21-be-ui-kit/src/lib/h21-breadcrumbs/h21-breadcrumbs.component';
import {H21UserCardComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-user-card/h21-user-card.component';
import {H21RightOverlayPanelComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-right-overlay-panel/h21-right-overlay-panel.component';
import {H21HeaderUserSelectorDialogComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-header/h21-header-user-selector-dialog.component';
import {H21PassengersSearchComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-passengers-search/h21-passengers-search.component';
import {H21HelpComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-help/h21-help.component";
import {H21TwoMonthCalendarComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-two-month-calendar/h21-two-month-calendar.component";
import {H21TwoMonthCalendarDialogComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-two-month-calendar/h21-two-month-calendar-dialog.component";
import {H21RightOverlayPanelService} from "../../projects/h21-be-ui-kit/src/lib/h21-right-overlay-panel/h21-right-overlay-panel.service";

/** Import Examples */
import {ButtonsDocsComponent} from './docs/buttons/buttons-docs.component';
import {ButtonToggleDocsComponent} from './docs/button-toggle/button-toggle-docs.component';
import {ColorsDocsComponent} from './docs/colors/colors-docs.component';
import {FormsDocsComponent} from './docs/forms/forms-docs.component';
import {GridDocsComponent} from './docs/grid/grid-docs.component';
import {IconsDocsComponent} from './docs/icons/icons-docs.component';
import {IconExampleDialogComponent} from './docs/icons/icon-example-dialog.component';
import {ImagesDocsComponent} from './docs/images/images-docs.component';
import {LayoutDocsComponent} from './docs/layout/layout-docs.component';
import {LogotypeDocsComponent} from './docs/logotype/logotype-docs.component';
import {SearchComponentsDocsComponent} from './docs/search-components/search-components-docs.component';
import {TabsDocsComponent} from './docs/tabs/tabs-docs.component';
import {TooltipsDocsComponent} from './docs/tooltips/tooltips-docs.component';
import {TypographyDocsComponent} from './docs/typography/typography-docs.component';
import {TwoMonthCalendarDocsComponent} from './docs/two-month-calendar/two-month-calendar-docs.component';
import {CounterInputComponent} from './docs/counter-input/counter-input.component';
import { count } from '../../node_modules/rxjs/operators';
import { DashboardComponent } from './docs/dashboard/dashboard.component';
import { TopToolbarDocsComponent } from './docs/top-toolbar/top-toolbar-docs.component';
import { H21TableUsersComponent } from './docs/h21-table-users/h21-table-users.component';
import { H21TableAgentsComponent } from './docs/h21-table-agents/h21-table-agents.component';
import { H21TableAgenciesComponent } from './docs/h21-table-agencies/h21-table-agencies.component';
import { H21TableTravelersComponent } from './docs/h21-table-travelers/h21-table-travelers.component';
import { H21TableProvidersComponent } from './docs/h21-table-providers/h21-table-providers.component';
import { SearchResultItemComponent } from './docs/search-result-item/search-result-item.component';

const routes: Routes = [
	{path: 'docs', component: DocsComponent },
	{path: 'style/:', component: DocsNavigationComponent },
	{path: 'components/:', component: DocsNavigationComponent },
	{path: 'demo',  component: AppComponent },
	{path: 'profile_demo',  component: AppComponent },
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
		H21PassengersSelectComponent,
		H21FilterPanelComponent,
		H21SidebarHistoryPanelComponent,
		H21BreadcrumbsComponent,
		H21HeaderUserSelectorDialogComponent,
		H21UserCardComponent,
		H21RightOverlayPanelComponent,
		H21PassengersSearchComponent,
		H21HelpComponent,
		H21TwoMonthCalendarComponent,
		H21TwoMonthCalendarDialogComponent,
		DocsNavigationComponent,
		DocsComponent,
		DocsExampleViewerComponent,
		ButtonsDocsComponent,
		ButtonToggleDocsComponent,
		ColorsDocsComponent,
		FormsDocsComponent,
		GridDocsComponent,
		IconsDocsComponent,
		ImagesDocsComponent,
		LayoutDocsComponent,
		LogotypeDocsComponent,
		SearchComponentsDocsComponent,
		TabsDocsComponent,
		TooltipsDocsComponent,
		TypographyDocsComponent,
		IconExampleDialogComponent,
		TwoMonthCalendarDocsComponent,
		CounterInputComponent,
		DashboardComponent,
		TopToolbarDocsComponent,
		H21TableUsersComponent,
		H21TableAgentsComponent,
		H21TableAgenciesComponent,
		H21TableTravelersComponent,
		H21TableProvidersComponent,
		SearchResultItemComponent,
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		BrowserAnimationsModule,
		AppMaterialModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		NouisliderModule,
		NgxMdModule.forRoot(),
	],
	providers: [
		{provide: VocabularyService, useValue: new FakeVocabularyService()},
		H21RightOverlayPanelService,
		AppSubscriberService,
		OrderService,
	],
	bootstrap: [AppComponent],
	entryComponents: [IconExampleDialogComponent, H21HeaderUserSelectorDialogComponent, H21TwoMonthCalendarDialogComponent, H21RightOverlayPanelComponent]
})

export class AppModule {

}
