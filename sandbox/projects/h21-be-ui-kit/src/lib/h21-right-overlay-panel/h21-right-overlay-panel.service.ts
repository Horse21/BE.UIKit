import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { H21RightOverlayPanelComponent } from "./h21-right-overlay-panel.component";
import { H21RightOverlayPanelRef } from "./h21-right-overlay-panel-ref";

@Injectable()




export class H21RightOverlayPanelService {

	constructor(private overlay: Overlay) {

	}

	overlayConfig = {
		backdropClass: 'c-h21-right-overlay-panel-box',
		hasBackdrop: true,
		width: '100%',
		height: '100%',
		panelClass: '',
	};

	open() {
		const rightPanelOverlayRef = this.overlay.create(this.overlayConfig);
		const dialogRef = new H21RightOverlayPanelRef(rightPanelOverlayRef);
		const rightPanelPortal = new ComponentPortal(H21RightOverlayPanelComponent);
		rightPanelOverlayRef.attach(rightPanelPortal);
		return dialogRef;
	}
}
