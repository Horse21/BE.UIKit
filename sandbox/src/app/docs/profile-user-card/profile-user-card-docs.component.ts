import {Component} from "@angular/core";
import {} from "./../../projects/h21-be-ui-kit/src/lib/h21-profile-user-card/h21-profile-user-card.component";

@Component({
	selector: 'profile-user-card-docs',
	templateUrl: './profile-user-card-docs.component.html'
})

export class ProfileUserCardDocsComponent {
	/** Section title */
	title = 'Profile user card';

	editable: boolean = false;

	cardView: string = 'user';
	cardViews: Array<string> = [ 'provider', 'user' , 'agent', 'traveler', 'agency' ];
}
