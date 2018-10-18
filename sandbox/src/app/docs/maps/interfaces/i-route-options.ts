import { IH21DateTime } from "./../../../../../projects/h21-be-ui-kit/src/dto";
import { TravelMode } from "../enum/e-travel-mode";
import { TrafficMode } from "../enum/e-traffic-mode";
import { IPolylineOptions } from "./i-polyline-options";

export interface IRouteOptions {
    travelMode: TravelMode;
    trafficModel: TrafficMode;
    departureTime: IH21DateTime;
    estimatedTimeArrival: IH21DateTime;
    polylineOptions: IPolylineOptions;
}
