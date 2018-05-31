import {Component} from "@angular/core";
import { SearchResult } from '../../dto/search-result';

@Component ({
	selector: "h21-search-result",
	templateUrl: "./h21-search-result.component.html"
})

export class H21SearchResultComponent {
	sortParameter = "price";
	result: SearchResult = new SearchResult();
}
