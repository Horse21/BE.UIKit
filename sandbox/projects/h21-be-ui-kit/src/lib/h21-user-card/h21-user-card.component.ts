import {Component, EventEmitter, Output, Input} from "@angular/core";

@Component ({
	selector: 'h21-user-card',
	templateUrl: './h21-user-card.component.html'
})

export class H21UserCardComponent {
	@Input() userName =  'Sergey Strovatikov';
	@Input() userEmail =  'darkdes6@gmail.com';
	@Input() userAvatarUrl = '/assets/avatar-picture.png';


	@Output() onLogout: EventEmitter<void> = new EventEmitter();

	logout(): void {
		this.onLogout.emit();
	}
}
