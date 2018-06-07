import { Component, EventEmitter } from "@angular/core";
import { trigger, state, transition, animate, style } from "@angular/animations";
import { H21RightOverlayPanelRef } from "./h21-right-overlay-panel-ref";
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component ({
	selector: "h21-right-overlay-panel",
	templateUrl: "./h21-right-overlay-panel.component.html",
	animations: [
		trigger('toggleVisibility', [
			state('void', style({transform: 'translateX(550px)'})),
			state('enter', style({transform: 'translateX(0)'})),
			state('leave',style({transform: 'translateX(550px)'})),
			transition('* => *', animate('120ms')),
		])
	]
})

export class H21RightOverlayPanelComponent {
	componentType: string;
	animationState: 'void' | 'enter' | 'leave' = 'enter';
	animationStateChanged = new EventEmitter<AnimationEvent>();

	constructor (public dialogRef: H21RightOverlayPanelRef, iconReg: MatIconRegistry, sanitizer: DomSanitizer,) {
		iconReg.addSvgIcon('h21_back_to_list', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/h21-back-to-list-gray.svg'));
	}

	close() {
		this.dialogRef.close();
	}

	onAnimationStart(event: AnimationEvent) {
		this.animationStateChanged.emit(event);
	}

	onAnimationDone(event: AnimationEvent) {
		this.animationStateChanged.emit(event);
	}

	startExitAnimation() {
		this.animationState = 'leave';
	}
}
