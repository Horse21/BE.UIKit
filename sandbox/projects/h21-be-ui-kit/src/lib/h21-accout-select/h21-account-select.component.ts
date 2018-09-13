import { Component, EventEmitter } from "@angular/core";
import { trigger, state, transition, animate, style } from "@angular/animations";
import { H21ProfileUserLinksRef } from "./h21-account-select-ref";

@Component ({
	selector: "h21-account-select",
	templateUrl: "./h21-account-select.component.html",
	animations: [
		trigger('toggleVisibility', [
			state('void', style({transform: 'translateX(800px)'})),
			state('enter', style({transform: 'translateX(0)'})),
			state('leave',style({transform: 'translateX(800px)'})),
			transition('* => *', animate('120ms')),
		])
	]
})

export class H21AccountSelectComponent {

	animationState: 'void' | 'enter' | 'leave' = 'enter';
	animationStateChanged = new EventEmitter<AnimationEvent>();

	constructor (public dialogRef: H21ProfileUserLinksRef) {

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
