import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {H21SidebarComponent} from "./h21-sidebar.component";
import {MatButtonModule, MatIconModule, MatProgressBarModule} from "@angular/material";
import {H21SearchPanelModule} from "../h21-search-panel/h21-search-panel.module";
import {H21SearchResultModule} from "../h21-search-result/h21-search-result.module";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatProgressBarModule,
		H21SearchPanelModule,
		H21SearchResultModule,
	],
	declarations: [H21SidebarComponent],
	exports: [H21SidebarComponent]
})
export class H21SidebarModule {

}
