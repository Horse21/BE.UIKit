import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SearchResult } from '../../dto/search-result';
import { AppSubscriberService } from '../../services/app-subscriber-service';
import { H21SearchResultComponent } from '../h21-search-result/h21-search-result.component';
import { VocabularyService } from '../../services/vocabulary-service';
import { SearchFlightDto } from '../../dto/search-flight-dto';
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
	selector: 'h21-sidebar',
	templateUrl: './h21-sidebar.component.html',
	animations: [
		trigger('toggleVisibility', [
			state('void', style({ opacity: 0 })),
			state('enter', style({ opacity: 1 })),
			state('leave',style({ opacity: 0 })),
			transition('* => *', animate('200ms')),
		])
	]
})

export class H21SidebarComponent implements OnInit, AfterViewInit {

	activeTab: string = 'tab-search';
	visibility = false;
	listVisibility = false;
	actionInProcess = false;
	resultVisibility = false;

	@ViewChildren(H21SearchResultComponent) private queryResultPanels: QueryList<H21SearchResultComponent>;
	private _result: SearchResult;

	constructor(private _vocabulary: VocabularyService,
				private _appSubscriber: AppSubscriberService) {
	}

	public ngOnInit(): void {
		this._appSubscriber.searchObservable().subscribe(options => {
			if (options) {
				this.search(options);
			} else {
				this.clearSearch();
			}
		});

		this._appSubscriber.searchResultModeObservable().subscribe(mode => {
			if (mode == 'list') {
				this.showList();
			} else {
				this.hideList();
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

	search(searchOptions: SearchFlightDto) {
		this.resultVisibility = false;
		this.actionInProcess = true;
		this.showList();
		setTimeout(() => {
			this._vocabulary.searchFlights(searchOptions).subscribe(result => {
				this._result = result;
				this.actionInProcess = false;
				setTimeout(() => {
					this.resultVisibility = true;
				}, 250);
			});
		}, 2000);
	}

	clearSearch() {
		this.hideList();
		this.resultVisibility = false;
	}

	private showList() {
		this.listVisibility = true;
	}

	private hideList() {
		this.listVisibility = false;
		//this.resultPanel.visibility = false;
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
