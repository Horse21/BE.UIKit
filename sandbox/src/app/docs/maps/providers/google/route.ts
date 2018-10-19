import { AbstractRouteBuilder } from "../../abstract/abstract-route-builder";
import { TravelMode } from "./enum/e-travel-mode";
import { RouteInfo } from "../../classes/route-info";
import { RouteTextValue } from "../../classes/route-text-value";
import { Observable, Observer } from "rxjs";
import { TypeRoute } from "../../enum/e-type-route";

declare var google;

export class GoogleRouteBuilder extends AbstractRouteBuilder {

    showStartPoint(): void {

        this.map.config.showMarker(this.startPoint, false);
    }

    showFinishPoint(): void {

        this.map.config.showMarker(this.finishPoint, false);

    }

    build(): void {

        let typeRoute: TypeRoute;

        try {

            this.map.config.clearAllMap();
            this.showStartPoint();
            this.showFinishPoint();

            switch (typeRoute) {
                case TypeRoute.CAR:
                    this.showRouteCar();
                    break;
                case TypeRoute.FLY:
                    this.showRouteFly();
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    getInfoRoute(typeTravelMode: string): Observable<any> {

        try {
            return new Observable((observer: Observer<any>) => {

                let travelMode = typeTravelMode;

                switch (typeTravelMode) {
                    case TravelMode.BICYCLING:
                        travelMode = TravelMode.BICYCLING;
                        break;
                    case TravelMode.WALKING:
                        travelMode = TravelMode.WALKING;
                        break;
                    case TravelMode.TRANSIT:
                        travelMode = TravelMode.TRANSIT;
                        break;
                }

                let directionsService = new google.maps.DirectionsService();

                let start = new google.maps.LatLng(this.map.route.startPoint.position.latitude, this.map.route.startPoint.position.longitude);
                let end = new google.maps.LatLng(this.map.route.finishPoint.position.latitude, this.map.route.finishPoint.position.longitude);


                let request = {
                    origin: start,
                    destination: end,
                    travelMode: TravelMode.DRIVING,
                    drivingOptions: {
                        departureTime: new Date(Date.now() + 3000),
                        trafficModel: google.maps.TrafficModel.PESSIMISTIC
                    }

                };

                directionsService.route(request, (response, status) => {

                    console.log(status, 'status')

                    if (status == google.maps.DirectionsStatus.OK) {

                        let info = response['routes'][0].legs[0];
                        let typeMode = response.request.travelMode;
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
                        routeInfo.staticMapUrl = '';
                        routeInfo.type = typeMode;
                        this.map.route.routeInfo = routeInfo;

                        observer.next(response);

                    } else {

                    }
                });
            });
        }
        catch (error) {
            console.log(error)
        }
    }

    getInfoDistance(): RouteInfo {

        return this.map.route.routeInfo;
    }

    private showRouteFly(): void {
        let directionsDisplay = new google.maps.Polyline({
            path: [new google.maps.LatLng(this.map.route.startPoint.position.latitude, this.map.route.startPoint.position.longitude), new google.maps.LatLng(this.map.route.finishPoint.position.latitude, this.map.route.finishPoint.position.longitude)],
            geodesic: true,
            strokeColor: '#007bff',
            strokeOpacity: 0.9,
            strokeWeight: 3,
            map: this.map.api
        });

        this.map.geo.pushRoutes(directionsDisplay);
    }

    private showRouteCar(): void {
        
        let directionsDisplay = new google.maps.DirectionsRenderer();

        directionsDisplay.setMap(this.map.api);
        this.map.geo.pushRoutes(directionsDisplay);

        directionsDisplay.setOptions({
            polylineOptions: {
                strokeColor: '#007bff',
                strokeOpacity: 0.9,
                strokeWeight: 5
            },
            suppressMarkers: true
        });
        this.getInfoRoute(TravelMode.DRIVING).subscribe(response => {
            directionsDisplay.setDirections(response);

        });
    }

}