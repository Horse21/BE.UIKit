import { IPoint } from "../interfaces/i-point";
import { IIcon } from "../interfaces/i-icon";
import { IPosition } from "../interfaces/i-position";
import { IPrice } from "../interfaces/i-price";
import { IAddress } from "../interfaces/i-address";

export class Point implements IPoint  {
    title: string;
    name: string;
    photos: Array<IIcon>;
    address: IAddress;
    position: IPosition;
    rating: number;
    price: IPrice;
    cancellationPolicy: string;
    extras: string;
    tmcAgencyMargin: string;
    id: string;
}
