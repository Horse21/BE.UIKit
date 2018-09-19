import { Component, OnInit } from '@angular/core';
import * as Manager from '../class/class-imap-manager';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit {
  constructor(private manager: Manager.Map.Manager) { }
  SearchMap(text: string) {
    this.manager.getActiveMap().search.SearchMap(text);
  }

  ngOnInit() {
  }

}
