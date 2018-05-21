import {Component} from '@angular/core';

@Component({
	selector: 'h21-sidebar',
	templateUrl: './h21-sidebar.component.html'
})

export class H21SidebarComponent {

	activeTab: string = '';
	visibility: boolean = false;

	public visibiltyToggle(): void {
		if (this.visibility) {
			this.visibiltyHide();
		} else {
			this.visibiltyShow();
		}
	}
	public visibiltyShow(): void {
		this.visibility = true;
		this.activeTab = "tab-search";
	}
	public visibiltyHide(): void {
		this.visibility = false;
		this.activeTab = "";
	}

}
