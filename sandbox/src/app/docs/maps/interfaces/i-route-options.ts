import { IH21DateTime } from "./../../../../../projects/h21-be-ui-kit/src/dto";
import { TravelMode } from "../enum/e-travel-mode";
import { TrafficMode } from "../enum/e-traffic-mode";
import { IPolylineOptions } from "./i-polyline-options";
import { TypeRoute } from "../enum/e-type-route";

export interface IRouteOptions {
    typeRoute: TypeRoute;
    travelMode: TravelMode;
    trafficModel: TrafficMode;
    departureTime: IH21DateTime;
    estimatedTimeArrival: IH21DateTime;
    polylineOptions: IPolylineOptions;
    showOnMap: boolean;
}
