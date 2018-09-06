import {Component, Input, OnInit} from '@angular/core';

@Component({
	selector: 'h21-rate',
	templateUrl: './h21-rate.component.html'
})

export class H21RateComponent implements OnInit {
	@Input() rate: number = 1;
	@Input() size: '' | 's' | 'm' | 'l' | 'xl' = '';

	fakeArray: Array<any> = new Array<any>();
	sizeClass: string = "";

	constructor () {

	}

	ngOnInit() {
		for (let i = 1; i <= this.rate; i++) {
			this.fakeArray.push("");
		}

		switch (this.size) {
			case 's' : this.sizeClass = `__size-${this.size}`;
				break;
			case 'm' : this.sizeClass = `__size-${this.size}`;
				break;
			case 'l' : this.sizeClass = `__size-${this.size}`;
				break;
			case 'xl' : this.sizeClass = `__size-${this.size}`;
				break;
			default: this.sizeClass = '';
		}
	}
}

