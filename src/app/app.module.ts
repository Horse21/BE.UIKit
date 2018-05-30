import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PrototypePermissionService } from '../app/services/prototype-permission-service';
import { PrototypeVocabularyService } from '../app/services/prototype-vocabulary-service';
import { H21HeaderUserSelectorDialogComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-header/h21-header-user-selector-dialog.component';
import { H21UserCardComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-user-card/h21-user-card.component';
import { PermissionService } from '../../sandbox/projects/h21-be-ui-kit/src/services/permission-service';
import { H21SidebarComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-sidebar/h21-sidebar.component';
import { H21TopToolbarComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-top-toolbar/h21-top-toolbar.component';
import { H21SearchPanelComponent } from "../../sandbox/projects/h21-be-ui-kit/src/lib/h21-search-panel/h21-search-panel.component";
import { H21FlyRouteSelectionComponent } from "../../sandbox/projects/h21-be-ui-kit/src/lib/h21-search-panel/h21-fly-route-selection.component";
import { MatNativeDateModule } from '@angular/material';
import { VocabularyService } from '../../sandbox/projects/h21-be-ui-kit/src/services/vocabulary-service';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './modules/app-material.module';
import { H21HeaderComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-header/h21-header.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
			H21FlyRouteSelectionComponent
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

		],
		providers: [
			{
				provide: PermissionService,
				useClass: PrototypePermissionService
			},
			{
				provide: VocabularyService,
				useClass: PrototypeVocabularyService
			}
		],
		bootstrap: [AppComponent],
		entryComponents: [H21HeaderUserSelectorDialogComponent]
	}
)
export class AppModule {
}
