import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { SearchResult } from '../../dto/search-result';
import { H21SearchResultComponent } from '../h21-search-result/h21-search-result.component';
import { VocabularyService } from '../../services/vocabulary-service';
import { SearchFlightDto } from '../../dto/search-flight-dto';

@Component({
	selector: 'h21-sidebar',
	templateUrl: './h21-sidebar.component.html'
})

export class H21SidebarComponent {
	activeTab: string = 'tab-search';
	visibility = true;
	listVisibility = false;
	@ViewChild(H21SearchResultComponent) private resultPanel: H21SearchResultComponent;
	@Output() onSearch: EventEmitter<void> = new EventEmitter<void>();
	@Output() onClearSearch: EventEmitter<void> = new EventEmitter<void>();

	constructor(private _vocabulary: VocabularyService) {}

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

	search(searchOptions: SearchFlightDto) {
		this.resultPanel.result = new SearchResult();
		this.showList();
		this._vocabulary.searchFlights(searchOptions).subscribe(result=>{
			this.resultPanel.result = result;
			console.log(this.resultPanel.result.groups[0].items);
		});
		this.onSearch.emit();
	}

	clearSearch() {
		this.hideList();
		this.onClearSearch.emit();
	}

	showList() {
		this.listVisibility = true;
	}

	hideList() {
		this.listVisibility = false;
	}
}
