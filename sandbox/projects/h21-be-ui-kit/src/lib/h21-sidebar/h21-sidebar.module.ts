import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {H21SidebarComponent} from "./h21-sidebar.component";
import {MatButtonModule, MatIconModule} from "@angular/material";
import {H21SearchPanelModule} from "../h21-search-panel/h21-search-panel.module";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		H21SearchPanelModule
	],
	declarations: [H21SidebarComponent],
	exports: [H21SidebarComponent]
})
export class H21SidebarModule {

}
