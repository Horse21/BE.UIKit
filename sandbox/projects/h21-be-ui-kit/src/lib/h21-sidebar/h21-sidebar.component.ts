import {
	AfterViewInit,
	Component,
	HostListener,
	OnInit,
	QueryList,
	ViewChildren
} from '@angular/core';
import {SearchResult} from '../../dto/search-result';
import {AppSubscriberService} from '../../services/app-subscriber-service';
import {H21SearchResultComponent} from '../h21-search-result/h21-search-result.component';
import {VocabularyService} from '../../services/vocabulary-service';

@Component({
	selector: 'h21-sidebar',
	templateUrl: './h21-sidebar.component.html',
})

export class H21SidebarComponent implements OnInit, AfterViewInit {

	activeTab: string = 'tab-search';
	visibility = true;
	searchResultVisibility = false;
	actionInProcess = false;

	@ViewChildren(H21SearchResultComponent) private queryResultPanels: QueryList<H21SearchResultComponent>;
	private _result: SearchResult;

	private screenWidth: number;
	private maxScreenWidth: number = 1200;

	@HostListener('window:resize', ['$event']) onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	constructor(private _vocabulary: VocabularyService,
				private _appSubscriber: AppSubscriberService) {
		this.onResize();
	}

	public ngOnInit(): void {
		// this._appSubscriber.searchObservable().subscribe(options => {
		// 	if (options) {
		// 		this.search(options);
		// 	} else {
		// 		this.clearSearch();
		// 	}
		// });

		this._appSubscriber.searchResultModeObservable().subscribe(mode => {
			if (mode == 'list' || mode == 'grid' || mode == 'full-width-list') {
				this.showSearchResult();
			} else if (mode == 'map')  {
				this.hideSearchResult();
			}
		});
	}

	visibilityToggle(): void {
		if (this.visibility) {
			this.visibilityHide();
		} else {
			this.visibilityShow();
		}
	}

	visibilityShow(): void {
		this.visibility = true;
		this.activeTab = "tab-search";
	}

	visibilityHide(): void {
		this.visibility = false;
		this.activeTab = "";
	}

	// search(searchOptions: SearchFlightDto) {
	// 	this.resultVisibility = false;
	// 	this.actionInProcess = true;
	// 	this.showList();
	// 	setTimeout(() => {
	// 		this._vocabulary.searchFlights(searchOptions).subscribe(result => {
	// 			this._result = result;
	// 			this.actionInProcess = false;
	// 			setTimeout(() => {
	// 				this.resultVisibility = true;
	// 			}, 250);
	// 		});
	// 	}, 2000);
	// 	if (this.screenWidth <= this.maxScreenWidth) {
	// 		this.visibilityHide();
	// 		this._appSubscriber.closeMenu();
	// 	}
	// }

	// clearSearch() {
	// 	this.hideList();
	// 	this.resultVisibility = false;
	// }


	searchResultVisibilityToggle(): void {
		if (!this.searchResultVisibility) {
			this.showSearchResult();
		} else {
			this.hideSearchResult();
		}
	}
	private showSearchResult() {
		this.searchResultVisibility = true;
	}

	private hideSearchResult() {
		this.searchResultVisibility = false;
	}



	public ngAfterViewInit(): void {
		this.queryResultPanels.changes.subscribe((comps: QueryList<H21SearchResultComponent>) =>
		{
			let resultPanel = comps.toArray()[0];
			if(resultPanel) {
				console.log(this.actionInProcess);
				resultPanel.setResult(this._result);
			}
		});
	}
}
