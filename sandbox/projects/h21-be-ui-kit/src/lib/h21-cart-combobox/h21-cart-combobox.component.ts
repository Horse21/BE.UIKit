import {Component, Input} from "@angular/core";
import {ICartComboboxRow} from "../../dto/i-cart-combobox-row";

const CART_DATA: Array<ICartComboboxRow> = [
	{ id: 1, name: 'Standart Double room', description: 'Non-refundable', provider: 'EX', price: 10000.00 },
	{ id: 2, name: 'Standart Double room', description: 'Non-refundable', provider: 'EX', price: 8000.00 },
	{ id: 3, name: 'Standart Double room', description: 'Non-refundable', provider: 'EX', price: 9000.00 },
]

@Component({
	selector: 'h21-cart-combobox',
	templateUrl: './h21-cart-combobox.component.html',
})

export class H21CartComboboxComponent {

	@Input() data: Array<ICartComboboxRow>;
	dropBoxVisibility: boolean = false;
	currencyCode: string = 'EUR';

	constructor() {
		this.data = CART_DATA;
	}

	toggle() {
		this.dropBoxVisibility = !this.dropBoxVisibility;
	}
}
