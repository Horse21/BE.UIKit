import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatIconModule} from "@angular/material";
import {H21RightOverlayPanelComponent} from "./h21-right-overlay-panel.component";
import {H21PassengersSearchModule} from "../h21-passengers-search/h21-passengers-search.module";
import {H21HelpModule} from "../h21-help/h21-help.module";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		H21PassengersSearchModule,
		H21HelpModule
	],
	declarations: [H21RightOverlayPanelComponent],
	exports: [H21RightOverlayPanelComponent],
	entryComponents: [H21RightOverlayPanelComponent]
})
export class H21RightOverlayPanelModule {

}
