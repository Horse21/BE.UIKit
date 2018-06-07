import {Component} from '@angular/core';

@Component({
  selector: 'h21-filter-panel',
  templateUrl: './h21-filter-panel.component.html',
})

export class H21FilterPanelComponent {

	matExpansionPanelHeaderDefaultHeight = '44px';

	priceSliderConfig: any = {
		behaviour: 'drag',
		connect: true,
		start: [1, 1000],
		step: 1,
		tooltips: [ true, true ],
		range: {
			min: 1,
			max: 1000
		},
	};

	// pageSteps: 10,  // number of page steps, defaults to 10
	// keyboard: true,  // same as [keyboard]="true"

}
