export interface ISidebarNavTab {
	name: string;
	label: string;
	icon: string;
	type: 'link' | 'button';
	url: string;
	disabled: boolean
}
