import {
	Component,
	EventEmitter,
	Input,
	Output
} from "@angular/core";
import {ISidebarNavTab} from "../../dto/i-sidebar-nav-tab";

@Component({
	selector: 'h21-sidebar-nav',
	templateUrl: './h21-sidebar-nav.component.html'
})

export class H21SidebarNavComponent {

	@Input() selected: string;
	@Input() disabled: boolean = false;
	@Input() tabs: Array<ISidebarNavTab>;
	@Output() onChanged: EventEmitter<ISidebarNavTab> = new EventEmitter<ISidebarNavTab>();

	constructor() {

	}

	select(name: string): void {
		this.selected = name;
		this.onChanged.emit(
			this.tabs.find((item) => { return item.name == name; })
		);
	}
}
