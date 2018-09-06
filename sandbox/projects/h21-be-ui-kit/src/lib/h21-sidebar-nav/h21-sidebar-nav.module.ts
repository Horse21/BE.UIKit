import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {H21SidebarNavComponent} from "./h21-sidebar-nav.component";
import {
	MatButtonModule,
	MatIconModule,
} from "@angular/material";
import {RouterModule} from "@angular/router";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		RouterModule
	],
	declarations: [
		H21SidebarNavComponent,
	],
	exports: [H21SidebarNavComponent]
})

export class H21SidebarNavModule {

}
