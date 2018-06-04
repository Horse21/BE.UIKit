import { Component } from "@angular/core";
import { H21RightOverlayPanelRef } from "./h21-right-overlay-panel-ref";

@Component ({
	selector: "h21-right-overlay-panel",
	templateUrl: "./h21-right-overlay-panel.component.html",
})

export class H21RightOverlayPanelComponent {

	constructor (public dialogRef: H21RightOverlayPanelRef) {

	}

	close() {
		this.dialogRef.close();
	}
}
