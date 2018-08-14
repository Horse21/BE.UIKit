import { Component, Renderer2,OnInit } from '@angular/core';
declare var google: any;
declare var MarkerClusterer: any;

@Component({
  selector: 'maps-components-docs',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  
})
export class MapsComponent implements OnInit {
  map: any;
  point:any[];
  markerCluster:any;
  constructor(private renderer: Renderer2) {

   }

   public InitMap() {

    var stylemap = [
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#e9e9e9"
              },
              {
                  "lightness": 17
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#f5f5f5"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 17
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 29
              },
              {
                  "weight": 0.2
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 18
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#f5f5f5"
              },
              {
                  "lightness": 21
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#dedede"
              },
              {
                  "lightness": 21
              }
          ]
      },
      {
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "saturation": 36
              },
              {
                  "color": "#333333"
              },
              {
                  "lightness": 40
              }
          ]
      },
      {
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#f2f2f2"
              },
              {
                  "lightness": 19
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#fefefe"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#fefefe"
              },
              {
                  "lightness": 17
              },
              {
                  "weight": 1.2
              }
          ]
      }
  ];

  //55.759381, 37.621766
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: new google.maps.LatLng( 55.759381, 37.621766),
        minZoom: 3,
        scaleControl: true,
        draggableCursor: 'default',
        disableDoubleClickZoom: true,
        disableDefaultUI: true,
        styles: stylemap

      });

      google.maps.event.addListener(this.map, 'bounds_changed', function () {
        console.log('bounds cn');
      });

      google.maps.event.addListener(this.map, 'idle', function () {
        var bounds = this.getBounds();
        if (bounds) {
          var SW = bounds.getSouthWest();
          var NE = bounds.getNorthEast();
        }

        console.log('idle ', bounds);
      });

      google.maps.event.addListener(this.map, 'zoom_changed', function () {
        console.log('zoom_changed ');
      });
  
    console.log('test2', typeof this.map);
  }

  public SetPoints(){
    var mcOptions = {
      gridSize: 80, maxZoom: 18, zoomOnClick: true, ignoreHidden: true, styles: [
               {
                   textColor: 'black',
                   url: '/images/map/icon_pointgroup.png',
                   anchorText: [0, -2],
                   height: 44,
                   width: 44
               }]
  };

  var obj = new google.maps.Marker({
    position: new google.maps.LatLng( 55.759381, 37.621766),
    draggable: false,
    clickable: true,
    zIndex: 9999,
   icon: { url: '/components/maps/images/icon/icon_hotel.png' },
    //C:\Users\main\Web project\BE.UIKit\sandbox\src\app\docs\maps\images\icon\icon_hotel.png
    title: 'New'
});

google.maps.event.addListener(obj, 'click', function (event) {
  console.log('clickMarker')
});

obj.setMap(this.map);

//this.markerCluster = new MarkerClusterer(this.map, obj, mcOptions);

  }

  LoadScript(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
  }

  ngOnInit() {
    this.LoadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCb2GKOwMmvcseTS2hbQ_2TFbJKVTA1WBo&libraries=places,geometry,drawing&signed_in=true&language=en").onload = () => {
      console.log('GoogleMap');
    };
    setTimeout(() => this.InitMap(), 3000);
    this.LoadScript("https://github.com/googlemaps/v3-utility-library/blob/master/markerclustererplus/src/markerclusterer.js").onload = () => {
      console.log('MarkerCluster');

      setTimeout(() => this.SetPoints(), 3000);

      
     
    };
  }

}
