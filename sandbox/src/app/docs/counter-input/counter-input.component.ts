import {Component} from "@angular/core"

@Component({
	selector: 'counter-input',
	templateUrl: './counter-input.component.html'
})

export class CounterInputComponent {
	/** Section title */
	title = 'Counter input';
	display = 0;
	count(operation, step){
		if(!step) {
			step = 1
		}else {
			step = step;
		}
		if(operation == 'plus'){
			this.display = this.display +=step;
		}
		else if(operation == 'minus') {
			this.display = this.display -=step;
		}
	}
}