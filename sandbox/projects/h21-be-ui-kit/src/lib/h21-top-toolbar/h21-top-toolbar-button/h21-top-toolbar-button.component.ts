import { Component, OnInit, Input } from '@angular/core';
import { IToolbarElement } from '../../../dto/i-toolbar-element';

@Component({
  selector: 'h21-top-toolbar-button',
  templateUrl: './h21-top-toolbar-button.component.html',
  styleUrls: []
})
export class H21TopToolbarButtonComponent implements OnInit {

  @Input() buttonData: IToolbarElement;

  constructor() {
  }

  ngOnInit() {
  }

}
