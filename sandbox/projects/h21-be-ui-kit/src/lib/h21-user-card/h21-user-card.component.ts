import { Component, EventEmitter, Output } from '@angular/core';

@Component ({
	selector: 'h21-user-card',
	templateUrl: './h21-user-card.component.html'
})

export class H21UserCardComponent {
	userName =  'Sergey Strovatikov';
	userEmail =  'darkdes6@gmail.com';
	userAvatarUrl = '/';

	@Output() onLogout: EventEmitter<void> = new EventEmitter();

	logout(): void {
		this.onLogout.emit();
	}
}
