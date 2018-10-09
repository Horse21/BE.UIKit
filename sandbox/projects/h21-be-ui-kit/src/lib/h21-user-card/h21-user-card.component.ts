import {
	Component,
	EventEmitter,
	Output,
	Input
} from "@angular/core";
import {IUserCardData} from "./dto/i-user-card-data";

@Component ({
	selector: 'h21-user-card',
	templateUrl: './h21-user-card.component.html'
})

export class H21UserCardComponent {
	@Input() data: IUserCardData;
	@Output() onAction: EventEmitter<string> = new EventEmitter();
	@Output() onLogout: EventEmitter<void> = new EventEmitter();

	constructor () {

	}

	action(actionName: string): void {
		console.log('test');
		this.onAction.emit(actionName);
	}

	logout(): void {
		this.onLogout.emit();
	}
}
