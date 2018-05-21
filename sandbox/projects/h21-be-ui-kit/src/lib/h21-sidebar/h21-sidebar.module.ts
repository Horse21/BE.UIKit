import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {H21SidebarComponent} from "./h21-sidebar.component";
import {MatButtonModule, MatIconModule} from "@angular/material";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule
	],
	declarations: [H21SidebarComponent],
	exports: [H21SidebarComponent]
})
export class H21SidebarModule {

}
