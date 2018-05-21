import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PrototypePermissionService } from 'app/services/prototype-permission-service';
import { H21HeaderUserSelectorDialogComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-header/h21-header-user-selector-dialog.component';
import { H21UserCardComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-user-card/h21-user-card.component';
import { PermissionService } from '../../sandbox/projects/h21-be-ui-kit/src/services/permission-service';
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
    H21UserCardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: PermissionService, useClass: PrototypePermissionService}
  ],
  bootstrap: [AppComponent],
  entryComponents:[H21HeaderUserSelectorDialogComponent]
})
export class AppModule {
}
