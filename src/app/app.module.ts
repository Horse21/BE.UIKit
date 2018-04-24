import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './modules/app-material.module';
import { H21MatHeaderComponent } from './h21-mat-header/h21-mat-header.component';
import { H21MatSidebarNavComponent } from './h21-mat-sidebar-nav/h21-mat-sidebar-nav.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    H21MatHeaderComponent,
    H21MatSidebarNavComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
