import { Component, EventEmitter } from "@angular/core";
import { trigger, state, transition, animate, style } from "@angular/animations";
import { H21RightOverlayPanelRef } from "./h21-right-overlay-panel-ref";

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
	animationState: 'void' | 'enter' | 'leave' = 'enter';
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

	startExitAnimation() {
		this.animationState = 'leave';
	}
}
