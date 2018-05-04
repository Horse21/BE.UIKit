import { Component, EventEmitter, ViewChild} from '@angular/core';
import { DocsNavigationComponent } from "../docs-navigation/docs-navigation.component";

@Component({
  selector: 'h21-sidebar',
  templateUrl: './h21-sidebar.component.html',
  styleUrls: ['./h21-sidebar.component.css']
})

export class H21SidebarComponent {
  @ViewChild(DocsNavigationComponent) private docsNavigation: DocsNavigationComponent;

  activeTab: string = 'tab-guide';

  getEmitter(): EventEmitter<String> {
    return this.docsNavigation.onChangeComponent;
  };
}
