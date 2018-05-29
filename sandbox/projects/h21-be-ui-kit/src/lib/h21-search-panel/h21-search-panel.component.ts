import { Component} from '@angular/core';
import { FlyRoute } from '../../dto/fly-route';

@Component({
  selector: 'h21-search-panel',
  templateUrl: './h21-search-panel.component.html'
})

export class H21SearchPanelComponent {
	constructor() {
	}

	flyRoutes: FlyRoute[] = [<FlyRoute>{},<FlyRoute>{}];
	searchMode = 'round_trip';

	search(): void {
		console.log(this.flyRoutes);
	}

	addFlyRoute() {
		this.flyRoutes.push(<FlyRoute>{});
	}

	removeFlyRoute() {
		this.flyRoutes.pop();
	}

	canAdd(i: number): boolean {
		return (
				   this.flyRoutes.length == i + 1 && this.searchMode == 'multi_city'
			   ) ||
			   (
				   this.searchMode == 'round_trip' && this.flyRoutes.length == 1
			   );
	}

	canRemove(i: number): boolean {
		return this.searchMode == 'multi_city' && this.flyRoutes.length == i + 1 && i != 0;
	}

	changeMode() {
		switch (this.searchMode) {
			case 'one_way': {
				while (this.flyRoutes.length > 1) {
					this.flyRoutes.pop();
				}
				break;
			}
			case 'round_trip': {
				while (this.flyRoutes.length > 2) {
					this.flyRoutes.pop();
				}
				if (this.flyRoutes.length == 1) {
					this.flyRoutes.push(<FlyRoute>{});
				}
				break;
			}
			case 'multi_city': {
				break;
			}
		}
	}
}
