import {Component} from "@angular/core"

@Component({
	selector: 'profile-user-card-docs',
	templateUrl: './profile-user-card-docs.component.html'
})

export class ProfileUserCardDocsComponent {
	/** Section title */
	title = 'Profile user card';

	editable: boolean = false;
}
