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
	/**
	 * Initializing HttpClientService
	 * @param {Http} http Angular Http Service
	 * @param {SettingsService} settingsService
	 */
	constructor(private http: HttpClient,
				private settingsService: SettingsService) {
	}

	/**
	 * Performs a request with `GET` http method.
	 * @param {string} url
	 * @param {IRequestOptions} options Request Options
	 * @returns {Observable<T>} Observable of Type
	 */
	get<T>(url: string, options?: IRequestOptions | null): Observable<T> {
		options = options || {};

		options.withCredentials = true;

		return this.http.get<T>(url, options);
	}

	/**
	 * Выполнение метода отностительно environment.apiRootUrl
	 * @param url относительный url
	 * @param options
	 */
	getApi<T>(url: string, options?: IRequestOptions | null): Observable<T> {
		return this.get<T>(`${this.settingsService.environment.apiRootUrl}${url}`, options);
	}

	/**
	 * Вызов getEntity в контроллере сущности
	 * @param entityName название сущности
	 * @param entityId ид сущности
	 * @param options
	 */
	getEntity<T>(entityName: string,
				 entityId: number,
				 options?: IRequestOptions | null): Observable<T> {
		return this.getApi<T>(`${entityName}/GetEntity?id=${entityId}`, options);
	}

	/**
	 * Performs a request with `FIND` http method.
	 * @param {string} url URL
	 * @param {IRequestOptions} options Request Options
	 * @returns {Observable<T>} Observable of Type
	 */
	find<T>(url: string,
			options?: IRequestOptions): Observable<T> {
		return this.get<T>(url, options);
	}

	/**
	 * Performs a request with `POST` http method.
	 * @param {string} url URL
	 * @param {any} body Request Data
	 * @param {IRequestOptions} options Request Options
	 * @returns {Observable<T>} Observable of Type
	 */
	post<T>(url: string, body: any, options?: IRequestOptions): Observable<T> {
		options = this.getDefaultOptions(options);

		return this.http.post<T>(url, JSON.stringify(body), options);
	}

	/**
	 * Выполнение метода отностительно environment.apiRootUrl
	 * @param url относительный url
	 * @param body
	 * @param options
	 */
	postApi<T>(url: string, body: any, options?: IRequestOptions): Observable<T> {
		return this.post<T>(`${this.settingsService.environment.apiRootUrl}${url}`, body, options);
	}

	/**
	 * Вызов postQuery в контроллере сущности
	 * @param entityName название сущности
	 * @param queryDto
	 * @param options
	 */
	postQuery<T>(entityName: string,
				 queryDto: QueryBase,
				 options?: IRequestOptions): Observable<IQueryResult<T>> {
		return this.postApi<IQueryResult<T>>(`${entityName}/PostQuery`, queryDto, options);
	}

	/**
	 * Вызов postSearch в контроллере сущности
	 * @param entityName название сущности
	 * @param queryDto
	 * @param options
	 */
	postSearch<T>(entityName: string,
				  queryDto: QueryBase,
				  options?: IRequestOptions): Observable<IQueryResult<T>> {
		return this.postApi<IQueryResult<T>>(`${entityName}/PostSearch`, queryDto, options);
	}


	/**
	 * Вызов postEntity в контроллере сущности
	 * @param entityName название сущности
	 * @param entity
	 * @param options
	 */
	postEntity<T>(entityName: string,
				  entity: T,
				  options?: IRequestOptions): Observable<T> {
		return this.postApi<T>(`${entityName}/PostEntity`, entity, options);
	}


	/**
	 * Вызов postDelete в контроллере сущности
	 * @param entityName название сущности
	 * @param body
	 * @param options
	 */
	postDelete(entityName: string,
			   body: any,
			   options?: IRequestOptions): Observable<Response> {
		return this.postApi<Response>(`${entityName}/PostDelete`, body, options);
	}


	/**
	 * Performs a request with `PUT` http method.
	 * @param {string} url URL
	 * @param {any} body Request Data
	 * @param {IRequestOptions} options Request Options
	 * @returns {Observable<T>} Observable of Type
	 */
	put<T>(url: string, body: any, options?: IRequestOptions): Observable<T> {
		options = this.getDefaultOptions(options);

		return this.http.put<T>(url, JSON.stringify(body), options);
	}


	/**
	 * Performs a request with `DELETE` http method.
	 * @param url URL
	 * @param options Request Options
	 * @returns {Observable<>} Observable of Type
	 */
	delete(url: string, options?: IRequestOptions): Observable<any> {
		return this.http.delete(url, options);
	}

	/**
	 * Скачать файл из FileStorage
	 * @param id id файла
	 */
	downloadFile(id: number): Observable<Blob> {
		return this.http.get(
			`${this.settingsService.environment.fileStorageUrl}FileStorage/GetDownload?id=${id}`,
			{
				withCredentials: true,
				responseType: 'blob'
			});
	}

	/**
	 * Скачать файл из FileStorage
	 * @param id id файла
	 * @param name название файла
	 */
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

	/**
	 * Отправить файл в FileStorage
	 *
	 * @param {string} url URL сервиса FileStorage
	 * @param {FormData} formData Данные формы
	 * @returns {Observable<T>} При успешном выполнении возвращает объект с данными о файле
	 */
	upload<T>(url: string, formData: FormData): Observable<T> {
		const headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');
		headers.append('Accept', 'application/json');
		return this.http.post<T>(url, formData, {
			responseType: 'json',
			headers
		});
	}

	/**
	 * Get Default HTTP Options
	 * @param {IRequestOptions} options Request Options
	 * @returns {IRequestOptions} Initialized Request Options
	 */
	private getDefaultOptions(options?: IRequestOptions): IRequestOptions {
		options = options || {};
		options.headers = options.headers || new HttpHeaders({'Content-Type': 'application/json'});
		options.withCredentials = true;
		return options;
	}
}
