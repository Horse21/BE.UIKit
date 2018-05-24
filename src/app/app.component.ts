import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Observable } from 'rxjs/index';
import { INotifyItem } from '../../sandbox/projects/h21-be-ui-kit/src/dto/inotifyItem';
import { PermissionService } from '../../sandbox/projects/h21-be-ui-kit/src/services/permission-service';
import { Passenger } from '../../sandbox/projects/h21-be-ui-kit/src/dto/passenger';
import { H21SidebarComponent } from '../../sandbox/projects/h21-be-ui-kit/src/lib/h21-sidebar/h21-sidebar.component';
import { AuthData } from './dto/auth-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders: [MatIconRegistry],
})
export class AppComponent {
	@ViewChild(H21SidebarComponent) private sidebar: H21SidebarComponent;
	title = 'prototype';
	username: string;
	private permissionService: PermissionService;

	constructor(
		iconReg: MatIconRegistry,
		sanitizer: DomSanitizer,
		private http: HttpClient,
		permissionService: PermissionService
	) {
		this.permissionService = permissionService;
		if(this.permissionService.isAuth()) {
			this.username = this.permissionService.getUsername();
		}
		iconReg.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('./assets/img/horse21-logo.svg'));
	}

	prototypeAuth(data: any): void {
		var authData: AuthData = <AuthData> {
			name: data.name,
			roles: data.roles,
			claims: data.claims
		};
		localStorage.setItem("authData", JSON.stringify(authData));
		location.reload();
	}

	logout(): void {
		localStorage.setItem("authData", null);
		location.reload();
	}

	getNotifyList(): INotifyItem[] {
		return [
			<INotifyItem>{text: 'First notification'},
			<INotifyItem>{text: 'Second notification'}
		];
	}

	showSidebar(): void {
		this.sidebar.visibiltyToggle();
	}

	public getPassengers(): Observable<Passenger> {
		return this.http.get<Passenger>("../assets/prototype-storage/passengers.json");
	}
}
