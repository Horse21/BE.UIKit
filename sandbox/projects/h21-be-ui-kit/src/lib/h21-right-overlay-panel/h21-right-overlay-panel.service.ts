import { Injectable, Injector, ComponentRef} from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { H21RightOverlayPanelComponent } from "./h21-right-overlay-panel.component";
import { H21RightOverlayPanelRef } from "./h21-right-overlay-panel-ref";

@Injectable()
export class H21RightOverlayPanelService {

	constructor(private injector: Injector, private overlay: Overlay) {
	}

	overlayConfig = {
		backdropClass: 'c-h21-right-overlay-panel-box',
		hasBackdrop: true,
		width: '100%',
		height: '100%',
		panelClass: '',
	};

	open(componentType: string) {
		const overlayRef = this.overlay.create(this.overlayConfig);
		const dialogRef = new H21RightOverlayPanelRef(overlayRef);
		const injectionTokens = new WeakMap();
		injectionTokens.set(H21RightOverlayPanelRef, dialogRef);
		const injector = new PortalInjector(this.injector, injectionTokens);
		const containerPortal = new ComponentPortal(H21RightOverlayPanelComponent, null, injector);
		const containerRef: ComponentRef<H21RightOverlayPanelComponent> = overlayRef.attach(containerPortal);
		dialogRef.componentInstance = containerRef.instance;
		dialogRef.componentInstance.componentType = componentType;
		return dialogRef;
	}
}
