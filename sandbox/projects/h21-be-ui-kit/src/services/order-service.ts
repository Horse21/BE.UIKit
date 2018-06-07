import { Injectable } from '@angular/core';
import { Passenger } from '../dto/passenger';
import { OrderData } from '../dto/order-data';

@Injectable()
export class OrderService {
	private _orderData: OrderData;

	addPassenger(passenger: Passenger) {
		this._orderData.passengers.push(passenger);
	}

	removePassenger(id: string) {
		this._orderData.passengers = this._orderData.passengers.filter(x => x.id != id);
	}

	getPassengers(): Passenger[] {
		return this._orderData.passengers;
	}
}
