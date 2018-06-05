import { OverlayRef } from '@angular/cdk/overlay';
import {H21RightOverlayPanelComponent} from "./h21-right-overlay-panel.component";

export class H21RightOverlayPanelRef {

	componentInstance: H21RightOverlayPanelComponent;

	constructor(private overlayRef: OverlayRef) {

	}

	close(): void {
		this.overlayRef.dispose();
	}
}
