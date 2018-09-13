import { Injectable, Injector, ComponentRef } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { H21AccountSelectComponent } from "./h21-account-select.component";
import { H21ProfileUserLinksRef } from "./h21-account-select-ref";

@Injectable()
export class H21AccountSelectService {

	constructor(private injector: Injector, private overlay: Overlay) {

	}

	overlayConfig = {
		backdropClass: 'c-h21-right-overlay-panel-box',
		hasBackdrop: true,
		width: '100%',
		height: '100%',
		panelClass: '',
	};

	open() {
		const overlayRef = this.overlay.create(this.overlayConfig);
		const dialogRef = new H21ProfileUserLinksRef(overlayRef);
		const injectionTokens = new WeakMap();
		injectionTokens.set(H21ProfileUserLinksRef, dialogRef);
		const injector = new PortalInjector(this.injector, injectionTokens);
		const containerPortal = new ComponentPortal(H21AccountSelectComponent, null, injector);
		const containerRef: ComponentRef<H21AccountSelectComponent> = overlayRef.attach(containerPortal);
		dialogRef.componentInstance = containerRef.instance;
	}
}
