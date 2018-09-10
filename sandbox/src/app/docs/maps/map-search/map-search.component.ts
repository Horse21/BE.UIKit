import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit {

  constructor() { }

  SearchMap(text:string){
    console.log('text',text);
  }

  ngOnInit() {
  }

}
