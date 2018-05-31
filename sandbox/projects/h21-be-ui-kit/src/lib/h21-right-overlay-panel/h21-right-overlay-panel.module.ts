import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatIconModule} from "@angular/material";
import {H21RightOverlayPanelComponent} from "./h21-right-overlay-panel.component";
import {H21RightOverlayPanelService} from "./h21-right-overlay-panel.service";
import {H21RightOverlayPanelRef} from "./h21-right-overlay-panel-ref";

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
	],
	declarations: [H21RightOverlayPanelComponent, H21RightOverlayPanelService, H21RightOverlayPanelRef],
	exports: [H21RightOverlayPanelComponent]
})
export class H21RightOverlayPanelModule {

}
