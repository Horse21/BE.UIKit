import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SettingsService} from './settings.service';
import {Observable} from 'rxjs/internal/Observable';
import {IRequestOptions} from '../dto/i-request-options';
import {QueryBase} from '../dto/query/query';
import {IQueryResult} from '../dto/query/i-query-result';

@Injectable({
	providedIn: 'root'
})
export class HttpClientService {

	constructor(private http: HttpClient,
				private settingsService: SettingsService) {
	}

	get<T>(url: string, options?: IRequestOptions | null): Observable<T> {
		options = options || {};

		options.withCredentials = true;

		return this.http.get<T>(url, options);
	}

	getApi<T>(url: string, options?: IRequestOptions | null): Observable<T> {
		return this.get<T>(`${this.settingsService.environment.apiRootUrl}${url}`, options);
	}

	getEntity<T>(entityName: string,
				 entityId: number,
				 options?: IRequestOptions | null): Observable<T> {
		return this.getApi<T>(`${entityName}/GetEntity?id=${entityId}`, options);
	}

	find<T>(url: string,
			options?: IRequestOptions): Observable<T> {
		return this.get<T>(url, options);
	}

	post<T>(url: string, body: any, options?: IRequestOptions): Observable<T> {
		options = this.getDefaultOptions(options);

		return this.http.post<T>(url, JSON.stringify(body), options);
	}

	postApi<T>(url: string, body: any, options?: IRequestOptions): Observable<T> {
		return this.post<T>(`${this.settingsService.environment.apiRootUrl}${url}`, body, options);
	}

	postQuery<T>(entityName: string,
				 queryDto: QueryBase,
				 options?: IRequestOptions): Observable<IQueryResult<T>> {
		return this.postApi<IQueryResult<T>>(`${entityName}/PostQuery`, queryDto, options);
	}

	postSearch<T>(entityName: string,
				  queryDto: QueryBase,
				  options?: IRequestOptions): Observable<IQueryResult<T>> {
		return this.postApi<IQueryResult<T>>(`${entityName}/PostSearch`, queryDto, options);
	}

	postEntity<T>(entityName: string,
				  entity: T,
				  options?: IRequestOptions): Observable<T> {
		return this.postApi<T>(`${entityName}/PostEntity`, entity, options);
	}

	postDelete(entityName: string,
			   body: any,
			   options?: IRequestOptions): Observable<Response> {
		return this.postApi<Response>(`${entityName}/PostDelete`, body, options);
	}

	put<T>(url: string, body: any, options?: IRequestOptions): Observable<T> {
		options = this.getDefaultOptions(options);

		return this.http.put<T>(url, JSON.stringify(body), options);
	}

	delete(url: string, options?: IRequestOptions): Observable<any> {
		return this.http.delete(url, options);
	}

	downloadFile(id: number): Observable<Blob> {
		return this.http.get(
			`${this.settingsService.environment.fileStorageUrl}FileStorage/GetDownload?id=${id}`,
			{
				withCredentials: true,
				responseType: 'blob'
			});
	}

	downloadFileByClick(id: number, name: string): void {
		this.downloadFile(id)
			.subscribe((e) => {
				const url = window.URL.createObjectURL(e);
				const a = document.createElement('a') as any;
				document.body.appendChild(a);
				a.style = 'display: none';
				a.href = url;
				a.download = name;
				a.click();
				window.URL.revokeObjectURL(url);
			});
	}

	upload<T>(url: string, formData: FormData): Observable<T> {
		const headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');
		headers.append('Accept', 'application/json');
		return this.http.post<T>(url, formData, {
			responseType: 'json',
			headers
		});
	}

	private getDefaultOptions(options?: IRequestOptions): IRequestOptions {
		options = options || {};
		options.headers = options.headers || new HttpHeaders({'Content-Type': 'application/json'});
		options.withCredentials = true;
		return options;
	}
}
