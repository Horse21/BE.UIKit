import { Injectable } from '@angular/core';
import { Passenger } from '../dto/passenger';
import { OrderData } from '../dto/order-data';

@Injectable()
export class OrderService {
	private _orderData: OrderData = new OrderData();
	private _lastNoNameId = 1;

	addPassenger(passenger: Passenger) {
		if (!passenger.id) {
			passenger.id = this._lastNoNameId.toString();
			this._lastNoNameId++;
		}
		this._orderData.passengers.push(passenger);
	}

	removePassenger(id: string) {
		this._orderData.passengers = this._orderData.passengers.filter(x => x.id != id);
	}

	getPassengers(): Passenger[] {
		return this._orderData.passengers;
	}
}
