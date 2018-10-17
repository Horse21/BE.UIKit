import { AbstractRouteBuilder } from "../../abstract/abstract-route-builder";
import { IPosition } from "../../interfaces/i-position";
import { TravelMode } from "./enum/e-travel-mode";
import { RouteInfo } from "../../classes/route-info";
import { RouteTextValue } from "../../classes/route-text-value";

declare var google;

export class GoogleRouteBuilder extends AbstractRouteBuilder {

    showStartPoint(): void {
        throw new Error("Method not implemented.");
    }

    showFinishPoint(): void {
        throw new Error("Method not implemented.");
    }

    showRoute(): void {

        try {
            var directionsService = new google.maps.DirectionsService();
            var pOptions = {
                strokeColor: "#007bff",
                strokeOpacity: 0.9,
                strokeWeight: 12,
            };
            let directionsDisplay = new google.maps.DirectionsRenderer();

            directionsDisplay.setMap(this.map.api);

            directionsDisplay.setOptions({
                polylineOptions: {
                    strokeColor: '#007bff',
                    strokeOpacity: 0.9,
                    strokeWeight: 5
                },
                suppressMarkers: true
            });
            var start = new google.maps.LatLng(this.map.geo.markers[0].point.position.latitude, this.map.geo.markers[0].point.position.longitude);
            var end = new google.maps.LatLng(this.map.geo.markers[1].point.position.latitude, this.map.geo.markers[1].point.position.longitude);


        } catch (err) {
            console.log(err)
        }


    }

    getDistanse(position: IPosition, typeTravelMode: string): void {

        console.log('getDistanse', 'typeTravelMode', typeTravelMode)

        let travelMode = TravelMode.DRIVING;

        switch (typeTravelMode) {
            case TravelMode.DRIVING:
                travelMode = TravelMode.DRIVING;
                break;
            case TravelMode.BICYCLING:
                travelMode = TravelMode.DRIVING;
                break;
            case TravelMode.WALKING:
                travelMode = TravelMode.WALKING;
                break;
            case TravelMode.TRANSIT:
                travelMode = TravelMode.TRANSIT;
                break;
            default:
            case TravelMode.DRIVING:
                break;
        }

        let directionsService = new google.maps.DirectionsService();

        let start = new google.maps.LatLng(55.755826, 37.617299900000035);
        let end = new google.maps.LatLng(55.340396, 38.29176510000002);

        let request = {
            origin: start,
            destination: end,
            travelMode: travelMode,
            drivingOptions: {
                departureTime: new Date(Date.now() + 3000),
                trafficModel: google.maps.TrafficModel.PESSIMISTIC
            }

        };
        directionsService.route(request, (result, status) => {

            if (status == google.maps.DirectionsStatus.OK) {

                let info = result['routes'][0].legs[0];

                let routeInfo = new RouteInfo();

                routeInfo.distance = new RouteTextValue();
                routeInfo.distance.text = info.distance.text;
                routeInfo.distance.value = info.distance.value;

                routeInfo.time = new RouteTextValue();
                routeInfo.time.text = info.duration.text;
                routeInfo.time.value = info.duration.value;
                routeInfo.timeTraffic = new RouteTextValue();

                routeInfo.timeTraffic.text = info.duration_in_traffic.text;
                routeInfo.timeTraffic.value = info.duration_in_traffic.value;


                console.log(routeInfo, 'routeInfo');

            } else {

            }
        });

        return null;

    }

}