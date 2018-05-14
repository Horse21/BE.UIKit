import { Component } from '@angular/core';

@Component({
  selector: 'h21-sidebar',
  templateUrl: './h21-sidebar.component.html',
  styleUrls: ['./h21-sidebar.component.css']
})

export class H21SidebarComponent {
  activeTab: string = 'tab-search';
}
