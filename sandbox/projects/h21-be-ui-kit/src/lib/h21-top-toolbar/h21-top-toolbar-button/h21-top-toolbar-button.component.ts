import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IToolbarElement } from '../../../dto/i-toolbar-element';

@Component({
  selector: 'h21-top-toolbar-button',
  templateUrl: './h21-top-toolbar-button.component.html',
  styleUrls: []
})
export class H21TopToolbarButtonComponent implements OnInit {

  @Input() buttonData: IToolbarElement;
  @Output() action: EventEmitter<any> = new EventEmitter();

  onClick(event) {
    this.action.emit(this.buttonData.action(event));
  }

  constructor() {
  }

  ngOnInit() {
  }

}
