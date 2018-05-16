import {Component, EventEmitter, Output} from '@angular/core';

@Component({
	selector: 'h21-docs-navigation',
	templateUrl: './docs-navigation.component.html'
})

export class DocsNavigationComponent {

	@Output() onChangeComponent: EventEmitter<string> = new EventEmitter<string>();

	panelOpenState: boolean;
	docsPagePath = '';

	changeComponent(event): void {
		event.stopPropagation();
		const target = event.target || event.srcElement || event.currentTarget;
		let hrefAttr = target.attributes.href;
		if (!hrefAttr) {
			hrefAttr = target.parentElement.attributes.href;
		}
		const link = hrefAttr.nodeValue;
		this.onChangeComponent.emit(link);
	}

	getEmitter(): EventEmitter<String> {
		return this.onChangeComponent;
	};
}
