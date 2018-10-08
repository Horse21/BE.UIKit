import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatButtonModule,
	MatCardModule,
	MatDividerModule,
	MatIconModule,
	MatListModule,
} from "@angular/material";
import {H21UserCardComponent} from "./h21-user-card.component"
import {RouterModule} from "@angular/router";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatListModule,
		MatCardModule,
		MatDividerModule,
		RouterModule
	],
	declarations: [H21UserCardComponent],
	exports: [H21UserCardComponent],
})

export class H21UserCardModule {

}
