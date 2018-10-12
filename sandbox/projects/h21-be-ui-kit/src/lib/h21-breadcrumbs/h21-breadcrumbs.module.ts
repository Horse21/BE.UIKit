import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatIconModule} from "@angular/material";
import {H21BreadcrumbsComponent} from "./h21-breadcrumbs.component";
import {RouterModule} from "@angular/router";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		RouterModule
	],
	declarations: [H21BreadcrumbsComponent],
	exports: [H21BreadcrumbsComponent]
})

export class H21BreadcrumbsModule {

}
