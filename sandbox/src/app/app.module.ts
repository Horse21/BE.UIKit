import { DestinationLoaderService } from './../../projects/h21-be-ui-kit/src/services/destination-loader.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {NgxMdModule} from 'ngx-md';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppSubscriberService} from '../../projects/h21-be-ui-kit/src/services/app-subscriber-service';
import {OrderService } from '../../projects/h21-be-ui-kit/src/services/order-service';
import {VocabularyService} from '../../projects/h21-be-ui-kit/src/services/vocabulary-service';
import {FakeVocabularyService} from '../services/fake-vocabulary-service';
import {AppMaterialModule} from './modules/app-material.module';
import {AppComponent} from './app.component';

import {DocsComponent} from './docs/docs.component';
import {DocsNavigationComponent} from './docs-navigation/docs-navigation.component';
import {DocsExampleViewerComponent} from './docs-example-viewer/docs-example-viewer.component';
import {NouisliderModule} from 'ng2-nouislider';

import {DxDataGridModule,DxTemplateModule} from 'devextreme-angular';

/** Import H21 components */
import {H21HeaderComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-header/h21-header.component';
import {H21TopToolbarComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-top-toolbar/h21-top-toolbar.component';
import {H21SidebarNavComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-sidebar-nav/h21-sidebar-nav.component';
import {H21SidebarComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-sidebar/h21-sidebar.component';
import {H21SearchPanelComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-search-panel/h21-search-panel.component';
import {H21HotelSearchPanelComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-hotel-search-panel/h21-hotel-search-panel.component';
import {H21HotelFilterPanelComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-hotel-filter-panel/h21-hotel-filter-panel.component';
import {H21FlyRouteSelectionComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-search-panel/h21-fly-route-selection.component";
import {H21PassengersSelectComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-search-panel/h21-passengers-select.component";
import {H21SearchResultComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-search-result/h21-search-result.component";
import {H21SearchResultRowComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-search-result-row/h21-search-result-row.component";
import {H21FilterPanelComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-filter-panel/h21-filter-panel.component';
import {H21BreadcrumbsComponent} from './../../projects/h21-be-ui-kit/src/lib/h21-breadcrumbs/h21-breadcrumbs.component';
import {H21UserCardComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-user-card/h21-user-card.component';
import {H21RightOverlayPanelComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-right-overlay-panel/h21-right-overlay-panel.component';
import {H21HeaderUserSelectorDialogComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-header/h21-header-user-selector-dialog.component';
import {H21HeaderSearchSettingsDialogComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-header/h21-header-search-settings-dialog.component';
import {H21PassengersSearchComponent} from '../../projects/h21-be-ui-kit/src/lib/h21-passengers-search/h21-passengers-search.component';
import {H21HelpComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-help/h21-help.component";
import {H21TwoMonthCalendarComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-two-month-calendar/h21-two-month-calendar.component";
import {H21TwoMonthCalendarDialogComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-two-month-calendar/h21-two-month-calendar-dialog.component";
import {H21RightOverlayPanelService} from "../../projects/h21-be-ui-kit/src/lib/h21-right-overlay-panel/h21-right-overlay-panel.service";
import {H21CounterComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-counter/h21-counter.component";
import {H21RateComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-rate/h21-rate.component";
import {H21HistoryPanelComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-history-panel/h21-history-panel.component";
import {H21HotelSearchResultComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-hotel-search-result/h21-hotel-search-result.component";
import {H21HotelBookComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-hotel-book/h21-hotel-book.component";
import {H21SlideCarouselComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-slide-carousel/h21-slide-carousel.component";
import {H21HotelSearchResultCardComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-hotel-search-result-card/h21-hotel-search-result-card.component";
import {H21HotelRoomDetailComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-hotel-room-detail/h21-hotel-room-detail.component";
import {H21CartComboboxComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-cart-combobox/h21-cart-combobox.component";
import {H21SlideCarouselDialogComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-slide-carousel/h21-slide-carousel-dialog.component";
import {H21HotelReservationComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-hotel-reservation/h21-hotel-reservation.component";
import {H21AccountSelectComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-accout-select/h21-account-select.component";
import {H21AccountSelectService} from "../../projects/h21-be-ui-kit/src/lib/h21-accout-select/h21-account-select-service";
import {H21ComboboxComponent} from "../../projects/h21-be-ui-kit/src/lib/h21-combobox/h21-combobox.component";

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
import { MapsComponent } from './docs/maps/maps.component';
import { TopToolbarDocsComponent } from './docs/top-toolbar/top-toolbar-docs.component';
import { H21TableUsersComponent } from './docs/h21-table-users/h21-table-users.component';
import { H21TableAgentsComponent } from './docs/h21-table-agents/h21-table-agents.component';
import { H21TableAgenciesComponent } from './docs/h21-table-agencies/h21-table-agencies.component';
import { H21TableTravelersComponent } from './docs/h21-table-travelers/h21-table-travelers.component';
import { H21TableProvidersComponent } from './docs/h21-table-providers/h21-table-providers.component';
import { SearchResultItemComponent } from './docs/search-result-item/search-result-item.component';
import {HotelSearchPanelDocsComponent} from './docs/hotel-search-panel/hotel-search-panel-docs.component';
import {HotelFilterPanelDocsComponent} from './docs/hotel-filter-panel/hotel-filter-panel-docs.component';
import { H21TopToolbarButtonComponent } from '../../projects/h21-be-ui-kit/src/lib/h21-top-toolbar/h21-top-toolbar-button/h21-top-toolbar-button.component';
import { H21TopToolbarButtonContainerComponent } from '../../projects/h21-be-ui-kit/src/lib/h21-top-toolbar/h21-top-toolbar-button-container/h21-top-toolbar-button-container.component';

const routes: Routes = [
	{path: '', redirectTo: '/', pathMatch: 'full'},
	// {path: 'demo', component: HomeComponent, children: [
	// 		{path: '', component: H21SearchPanelComponent, outlet: 'searchPanel'},
	// 		//{path: '', component: H21FilterPanelComponent, outlet: 'filterPanel'},
	// 		{path: '', component: H21HistoryPanelComponent, outlet: 'historyPanel'},
	// 	]},
	{path: 'demo', component: AppComponent },
	{path: 'demo/hotel', component: H21HotelBookComponent },
	{path: 'demo/hotelbook/:id', component: H21HotelBookComponent },
	{path: 'demo/reservation', component: H21HotelReservationComponent },
	{path: 'docs', component: DocsComponent },
	{path: 'style/:', component: DocsNavigationComponent },
	{path: 'components/:', component: DocsNavigationComponent },
	{path: '**', redirectTo: '/'}
];

@NgModule({
	declarations: [
		AppComponent,
		H21HeaderComponent,
		H21TopToolbarComponent,
		H21SidebarComponent,
		H21SearchPanelComponent,
		H21HotelSearchPanelComponent,
		H21HotelFilterPanelComponent,
		H21SearchResultComponent,
		H21SearchResultRowComponent,
		H21FlyRouteSelectionComponent,
		H21PassengersSelectComponent,
		H21FilterPanelComponent,
		H21BreadcrumbsComponent,
		H21HeaderUserSelectorDialogComponent,
		H21HeaderSearchSettingsDialogComponent,
		H21UserCardComponent,
		H21RightOverlayPanelComponent,
		H21PassengersSearchComponent,
		H21HelpComponent,
		H21TwoMonthCalendarComponent,
		H21TwoMonthCalendarDialogComponent,
		H21CounterComponent,
		H21RateComponent,
		H21HistoryPanelComponent,
		H21HotelSearchResultComponent,
		H21SidebarNavComponent,
		H21HotelBookComponent,
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
		MapsComponent,
		HotelSearchPanelDocsComponent,
		HotelFilterPanelDocsComponent,
		H21SlideCarouselComponent,
		H21HotelSearchResultCardComponent,
		H21HotelRoomDetailComponent,
		H21TopToolbarButtonComponent,
		H21TopToolbarButtonContainerComponent,
		H21CartComboboxComponent,
		H21SlideCarouselDialogComponent,
		H21HotelReservationComponent,
		H21AccountSelectComponent,
		H21ComboboxComponent,
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
		DxDataGridModule,
		DxTemplateModule,
	],
	providers: [
		{
			provide: VocabularyService,
			useValue: new FakeVocabularyService()
		},
		H21RightOverlayPanelService,
		H21AccountSelectService,
		AppSubscriberService,
		OrderService,
		DestinationLoaderService
	],
	bootstrap: [AppComponent],
	entryComponents: [
		IconExampleDialogComponent,
		H21HeaderUserSelectorDialogComponent,
		H21HeaderSearchSettingsDialogComponent,
		H21TwoMonthCalendarDialogComponent,
		H21RightOverlayPanelComponent,
		H21AccountSelectComponent,
		H21SlideCarouselDialogComponent,
	]
})

export class AppModule {

}
