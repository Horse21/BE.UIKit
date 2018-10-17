import {Component, Input} from "@angular/core";
import {ISearchHistoryCard} from "./dto/i-search-history-card";

@Component({
	selector: 'h21-search-history-panel',
	templateUrl: './h21-search-history-panel.component.html'
})

export class H21SearchHistoryPanelComponent {

	@Input() data: ISearchHistoryCard[];

	constructor() {

	}
}
