import { Component, ViewChild } from '@angular/core';
import { H21SearchResultRowComponent } from '../h21-search-result-row/h21-search-result-row.component';
import { SearchFlightDto } from '../../dto/search-flight-dto';

@Component({
	selector: 'h21-sidebar',
	templateUrl: './h21-sidebar.component.html'
})

export class H21SidebarComponent {

	activeTab: string = '';
	visibility: boolean = false;
	@ViewChild(H21SearchResultRowComponent) private resultPanel: H21SearchResultRowComponent;

	visibiltyToggle(): void {
		if (this.visibility) {
			this.visibiltyHide();
		} else {
			this.visibiltyShow();
		}
	}
	visibiltyShow(): void {
		this.visibility = true;
		this.activeTab = "tab-search";
	}
	visibiltyHide(): void {
		this.visibility = false;
		this.activeTab = "";
	}

	search(searchOptions:SearchFlightDto) {
		console.log(searchOptions);
	}
}
