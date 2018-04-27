import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'page-sidebar',
  templateUrl: './page-sidebar.component.html',
  styleUrls: ['./page-sidebar.component.css']
})

export class PageSidebarComponent {

  @Output()

  onChangeComponent: EventEmitter<string> = new EventEmitter<string>();

  changeComponent(event): void {
    event.stopPropagation();
    var target = event.target || event.srcElement || event.currentTarget;
    var hrefAttr = target.attributes.href;
    if (!hrefAttr) {
      hrefAttr = target.parentElement.attributes.href;
    }
    var link = hrefAttr.nodeValue;
    this.onChangeComponent.emit(link);
  }

}
