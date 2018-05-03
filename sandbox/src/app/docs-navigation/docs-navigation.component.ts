import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'docs-navigation',
  templateUrl: './docs-navigation.component.html',
  styleUrls: ['./docs-navigation.component.css']
})

export class DocsNavigationComponent {

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

  docsPagePath = '';

}
