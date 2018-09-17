import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  responseType: "json",
  url: "./destinations.json"
};

@Injectable({
	providedIn: 'root'
})
export class DestinationLoaderService {

	constructor(private http: HttpClient) {

  }

	getDestinations(): Observable<any> {
		return this.http.get(httpOptions.url, { responseType: "json" });
	}
}
