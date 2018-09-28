import { IAddress } from "./i-address";
import { IPrice } from "./i-price";
import { IPosition } from "./i-position";
import { IIcon } from "./i-icon";

export interface IPoint {
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
