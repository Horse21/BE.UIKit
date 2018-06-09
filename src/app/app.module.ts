import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';
import { PrototypePermissionService } from '../app/services/prototype-permission-service';
import { PrototypeVocabularyService } from '../app/services/prototype-vocabulary-service';
import { H21HeaderUserSelectorDialogComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-header/h21-header-user-selector-dialog.component';
import { H21UserCardComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-user-card/h21-user-card.component';
import { PermissionService } from '../../sandbox/projects/h21-be-ui-kit/src/services/permission-service';
import { H21SidebarComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-sidebar/h21-sidebar.component';
import { H21TopToolbarComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-top-toolbar/h21-top-toolbar.component';
import { H21SearchPanelComponent } from "../../sandbox/projects/h21-be-ui-kit/src/lib/h21-search-panel/h21-search-panel.component";
import { H21FlyRouteSelectionComponent } from "../../sandbox/projects/h21-be-ui-kit/src/lib/h21-search-panel/h21-fly-route-selection.component";
import { H21SearchResultComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-search-result/h21-search-result.component';
import { H21SearchResultRowComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-search-result-row/h21-search-result-row.component';
import { MatNativeDateModule } from '@angular/material';
import { VocabularyService } from '../../sandbox/projects/h21-be-ui-kit/src/services/vocabulary-service';
import { H21PassangersSelectComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-search-panel/h21-passangers-select.component';
import { H21RightOverlayPanelService } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-right-overlay-panel/h21-right-overlay-panel.service';
import { AppSubscriberService } from '../../sandbox/projects/h21-be-ui-kit/src/services/app-subscriber-service';
import { OrderService } from '../../sandbox/projects/h21-be-ui-kit/src/services/order-service';
import { H21HelpComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-help/h21-help.component';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './modules/app-material.module';
import { H21HeaderComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-header/h21-header.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { H21RightOverlayPanelComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-right-overlay-panel/h21-right-overlay-panel.component';
import { H21PassangersSearchComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-passangers-search/h21-passangers-search.component';
import { H21FilterPanelComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-filter-panel/h21-filter-panel.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '**', redirectTo: '/'},
];

@NgModule({
		declarations: [
			AppComponent,
			H21HeaderComponent,
			H21HeaderUserSelectorDialogComponent,
			H21UserCardComponent,
			H21TopToolbarComponent,
			H21SidebarComponent,
			H21SearchPanelComponent,
			H21FlyRouteSelectionComponent,
			H21SearchResultComponent,
			H21SearchResultRowComponent,
			H21PassangersSelectComponent,
			H21RightOverlayPanelComponent,
			H21PassangersSearchComponent,
			H21FilterPanelComponent,
			H21HelpComponent
		],
		imports: [
			BrowserModule,
			RouterModule.forRoot(routes),
			BrowserAnimationsModule,
			AppMaterialModule,
			ReactiveFormsModule,
			FormsModule,
			HttpClientModule,
			MatNativeDateModule,
			NouisliderModule
		],
		providers: [
			{
				provide: PermissionService,
				useClass: PrototypePermissionService
			},
			{
				provide: VocabularyService,
				useClass: PrototypeVocabularyService
			},
			H21RightOverlayPanelService,
			AppSubscriberService,
			OrderService
		],
		bootstrap: [AppComponent],
		entryComponents: [H21HeaderUserSelectorDialogComponent, H21RightOverlayPanelComponent]
	}
)
export class AppModule {
}
