import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
	responseType: 'json',
	url: ''
};

@Injectable({
	providedIn: 'root'
})
export class DestinationLoaderService {
	constructor(private http: HttpClient) {}

	url(url: string): DestinationLoaderService {
		httpOptions.url = url;
		return this;
	}

	getDestinations(): Observable<any> {
		return this.http.get(httpOptions.url);
	}
}
