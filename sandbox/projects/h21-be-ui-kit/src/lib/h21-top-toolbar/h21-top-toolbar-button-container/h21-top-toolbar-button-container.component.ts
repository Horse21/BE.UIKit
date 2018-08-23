import { Component, OnInit, Input } from '@angular/core';
import { IToolbarElement } from '../../../dto/i-toolbar-element';

@Component({
  selector: 'h21-top-toolbar-button-container',
  templateUrl: './h21-top-toolbar-button-container.component.html',
  styleUrls: []
})
export class H21TopToolbarButtonContainerComponent implements OnInit {

  @Input() buttonsData: Array<IToolbarElement>;
  @Input() condition: string;

  constructor() { }

  ngOnInit() {
  }

}
