export interface IUserCardAction {
	name: string;
	label: string;
	icon: string;
	route: string;
	type: 'link' | 'button';
}
