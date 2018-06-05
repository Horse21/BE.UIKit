import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppSubscriberService } from '../../services/app-subscriber-service';
import { SearchResult } from '../../dto/search-result';
import { H21SearchResultComponent } from '../h21-search-result/h21-search-result.component';
import { VocabularyService } from '../../services/vocabulary-service';
import { SearchFlightDto } from '../../dto/search-flight-dto';

@Component({
	selector: 'h21-sidebar',
	templateUrl: './h21-sidebar.component.html'
})

export class H21SidebarComponent implements OnInit {
	activeTab: string = 'tab-search';
	visibility = true;
	listVisibility = false;
	actionInProcess = false;
	@ViewChild(H21SearchResultComponent) private resultPanel: H21SearchResultComponent;

	constructor(private _vocabulary: VocabularyService,
		private _appSubscriber: AppSubscriberService) {}

	public ngOnInit(): void {
		this._appSubscriber.searchObservable().subscribe(options=> {
			if (options) {
				this.search(options);
			} else {
				this.clearSearch();
			}
		});

		this._appSubscriber.searchResultModeObservable().subscribe(mode => {
			if(mode == 'list') {
				this.showList();
			} else{
				this.hideList();
			}
		});
	}

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
		this.resultPanel.setResult(new SearchResult());
		this.showList();
		this.actionInProcess = true;
		setTimeout(()=>{
			this._vocabulary.searchFlights(searchOptions).subscribe(result=>{
				this.resultPanel.setResult(result);
				this.actionInProcess = false;
			});
		}, 2000);
	}

	clearSearch() {
		this.hideList();
	}

	private showList() {
		this.listVisibility = true;
	}

	private hideList() {
		this.listVisibility = false;
	}
}
