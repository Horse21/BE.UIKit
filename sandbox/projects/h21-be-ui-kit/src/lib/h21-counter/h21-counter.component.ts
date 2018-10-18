import {Component, EventEmitter, Input, Output} from "@angular/core"

@Component({
	selector: 'h21-counter',
	templateUrl: './h21-counter.component.html'
})

export class H21CounterComponent {

	@Input() value: number;
	@Input() max: number;
	@Input() min: number;
	@Input() reduceOnlyProgrammatically: boolean;
	@Input() increaseOnlyProgrammatically: boolean;
	@Output() onChanged: EventEmitter<number> ;
	@Output() onReduce: EventEmitter<void>;
	@Output() onIncrease: EventEmitter<void>;

	constructor() {
		this.init();
	}

	init() {
		this.value = 0;
		this.max = 99;
		this.min = -99;
		this.reduceOnlyProgrammatically = false;
		this.increaseOnlyProgrammatically = false;
		this.onChanged = new EventEmitter<number>();
		this.onReduce = new EventEmitter<void>();
		this.onIncrease = new EventEmitter<void>();
	}

	reduce() {
		if (this.reduceOnlyProgrammatically) {
			this.onReduce.emit();
		} else {
			if (this.value >= this.min) {
				this.value--;
				this.onChanged.emit(this.value);
			}
		}
	}

	increase() {
		if (this.increaseOnlyProgrammatically) {
			this.onIncrease.emit();
		} else {
			if (this.value <= this.max) {
				this.value++;
				this.onChanged.emit(this.value);
			}
		}
	}
}
