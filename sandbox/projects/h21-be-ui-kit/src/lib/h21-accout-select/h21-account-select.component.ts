import {Component, EventEmitter, Inject} from "@angular/core";
import { trigger, state, transition, animate, style } from "@angular/animations";
import { H21AccountSelectRef } from "./h21-account-select-ref";
import { ACCOUNTS_DIALOG_DATA } from "./h21-accounts-select.tokens";

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
	selectedAccount: any;

	constructor (public dialogRef: H21AccountSelectRef,
				 @Inject(ACCOUNTS_DIALOG_DATA) public accounts: any) {
		this.selectedAccount = accounts[0];
	}

	changeSelectionAccount(id: number) {
		let index = this.accounts.findIndex( (item) => { return item.id == id; } );
		this.selectedAccount = this.accounts[index];
	}

	close() {
		this.dialogRef.close(null);
	}

	returnDialog() {
		this.dialogRef.close(this.selectedAccount);
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
