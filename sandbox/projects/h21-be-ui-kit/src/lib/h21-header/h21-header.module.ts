import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatBadgeModule, MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule} from "@angular/material";
import {H21HeaderComponent} from "./h21-header.component";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatMenuModule,
		MatToolbarModule,
		MatBadgeModule
	],
	declarations: [H21HeaderComponent],
	exports: [H21HeaderComponent]
})
export class H21HeaderModule {
}
