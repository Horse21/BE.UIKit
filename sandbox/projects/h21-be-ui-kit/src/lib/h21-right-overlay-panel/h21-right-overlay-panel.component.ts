import { Component, EventEmitter } from "@angular/core";
import { trigger, state, transition, animate, style } from "@angular/animations";
import { H21RightOverlayPanelRef } from "./h21-right-overlay-panel-ref";

@Component ({
	selector: "h21-right-overlay-panel",
	templateUrl: "./h21-right-overlay-panel.component.html",
	animations: [
		trigger('toggleVisibility', [
			state('is-hidden', style({transform: 'transalteX(-500px)'})),
			state('is-visible',style({transform: 'transalteX(0)'})),
			transition('is-hidden => is-visible', animate('400ms')),
			transition('is-visible => is-hidden', animate('400ms'))
		])
	]
})

export class H21RightOverlayPanelComponent {
	animationState: 'is-hidden' | 'is-visible' = 'is-hidden';
	animationStateChanged = new EventEmitter<AnimationEvent>();

	constructor (public dialogRef: H21RightOverlayPanelRef) {

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
}
