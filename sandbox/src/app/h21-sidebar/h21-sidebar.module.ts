import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {H21SidebarComponent} from "./h21-sidebar.component";
import {MatButtonModule, MatIconModule} from "@angular/material";
import {H21DocsNavigationModule} from "../docs-navigation/h21-docs-navigation.module";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		H21DocsNavigationModule
	],
	declarations: [H21SidebarComponent],
	exports: [H21SidebarComponent]
})
export class H21SidebarModule {
}
