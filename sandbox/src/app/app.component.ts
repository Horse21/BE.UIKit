import { Component, ViewChild} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { DocsComponent } from "./docs/docs.component";
import { H21SidebarComponent } from "./h21-sidebar/h21-sidebar.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders: [MatIconRegistry]
})

export class AppComponent {
  @ViewChild(H21SidebarComponent) private sidebar: H21SidebarComponent;
  @ViewChild(DocsComponent) private docs: DocsComponent;

  constructor(iconReg: MatIconRegistry, sanitizer: DomSanitizer) {
    iconReg.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('./assets/img/horse21-logo.svg'));
  }

  ngOnInit() {
    this.subscription = this.sidebar.getEmitter().subscribe(item => this.docs.changeComponent(item));
  }

  title = 'Horse 21 Pro';
  subscription: any;
}
