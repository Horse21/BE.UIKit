import { AbstractRouteBuilder } from "../../abstract/abstract-route-builder";

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
                var DateTime = '';
                var start = new google.maps.LatLng(this.map.geo.markers[0].point.position.latitude, this.map.geo.markers[0].point.position.longitude);
                var end = new google.maps.LatLng(this.map.geo.markers[1].point.position.latitude, this.map.geo.markers[1].point.position.longitude);
               
                this.map.api.departureDateTimeTraffic = null;
               
                var request = {
                    origin: start,
                    destination: end,
                    travelMode: google.maps.TravelMode.DRIVING,
                    drivingOptions: {
                        departureTime: new Date(Date.now() + 3000),
                        trafficModel: google.maps.TrafficModel.PESSIMISTIC
                    }

                };

                directionsService.route(request, function (result, status) {

                    if (status == google.maps.DirectionsStatus.OK) {
                        
                        this.map.api.directionsDisplay.setDirections(result);
                
                        var request2 = result.request;
                        
                        
                    } else {

                    }
                });
            
        } catch (err) {
            console.log(err)
        }
        

    }

}