import {Component, EventEmitter, Input, Output} from "@angular/core"

@Component({
	selector: 'h21-counter',
	templateUrl: './h21-counter.component.html'
})

export class H21CounterComponent {

	@Input() value: number = 0;
	@Input() max: number = 99;
	@Input() min: number = -99;
	@Output() onChanged: EventEmitter<number> = new EventEmitter<number>();

	reduce() {
		if (this.value >= this.min) {
			this.value--;
			this.onChanged.emit(this.value);
		}
	}

	increase() {
		if (this.value <= this.max) {
			this.value++;
			this.onChanged.emit(this.value);
		}
	}
}
