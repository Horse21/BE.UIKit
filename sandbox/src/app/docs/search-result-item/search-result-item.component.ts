import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss']
})
export class SearchResultItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.querySelector('.search-result-item-favorite mat-icon').addEventListener('click', function(el) {
      [].map.call(document.querySelectorAll('.search-result-item-favorite mat-icon'), function(el) {
        // classList supports 'contains', 'add', 'remove', and 'toggle'
        el.classList.toggle('active');
      });
    });
  }
}
