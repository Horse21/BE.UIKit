export interface IUserCardAction {
	name: string;
	label: string;
	icon: string;
	route: string;
	type: 'link' | 'button';
}

export interface IUserCardUser {
	name: string;
	email: string;
	avatarUrl: string;
}

export interface IUserCardData{
	user: IUserCardUser;
	actions: IUserCardAction[];
}
