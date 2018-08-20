import { Component, OnInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { GoogleMap } from './class/google/map';
import { LoadApiMap, InitMap } from "./interface/interface-init";
import { ConfigMap } from "./interface/interface-config";
import * as data from "./maps.const.json";
import { MarkerMap } from './interface/interface-marker';
import { MainMap } from './interface/interface-main';
import { InfoWindowMap } from './interface/interface-infowindow';
import { MarkerClusterMap } from './interface/interface-markercluster';
import * as markercluster from "./markercluster.json";
//

const url = 'https://googlemaps.github.io/js-marker-clusterer/src/markerclusterer.js';
declare var google: any;
declare var MarkerClusterer: any;
declare var BMap: any;
declare var ymaps: any;
var source: any;

@Component({
    selector: 'maps-components-docs',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css'],
    // providers:[GoogleMap],
})

export class MapsComponent implements OnInit {

    point: any[];
    markerCluster: any;
    source: MainMap;


   

    public Init(code: string) {
        switch (code) {
            case "yandex": {
                //this.script = new YandexMap();
            }
            case "baidu": {
                //this.script = new YandexMap();
            }
            default: {
                this.source = new GoogleMap();

            }
        }
        let dt: LoadApiMap = data['InitList'][code];
        this.source.init.Init(dt).then(data => {
            console.log(data, 'data')
            if (data.status === 'Loaded') {
                let load = this.source.init.Load();
                this.source.map = load.map;
                this.source.traffic = load.traffic;
                console.log(load, 'LOAD')
                this.source.events.Subscribe(this.source.map);


                setTimeout(() =>this.loadScript(),2000)  

              

                //"../../class/google/maps.style.json";
                //setTimeout(() => this.source.config.TrafficLayer(this.source.map,this.source.traffic,true),2000)

                // setTimeout(() => this.source.config.TrafficLayer(this.source.map,this.source.traffic,false),4000)
            }
        }).
            catch(error => console.log(error));
    }


    public loadScript() {
        console.log('preparing to load...')
        let node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);



        setTimeout(() => this.MarkerCluster(),2000)  
    }

    public MarkerCluster()
    
    {
        var mcOptions = {
            gridSize: 80, maxZoom: 18, zoomOnClick: true, ignoreHidden: true, styles: [
                     {
                         textColor: 'black',
                    //     url: require('./images/icon/icon_pointGroup.png'),
                         anchorText: [0, -2],
                         height: 44,
                         width: 44
                     }]
        };

       var Point = [];
        var d = markercluster['default']['photos'];

        d.forEach((item, index) => {
            console.log(item); 
            var obj = new google.maps.Marker({
             position: { lat: item.latitude, lng: item.longitude },
             draggable: false,
             clickable: true,
            // zIndex: 9999,
          //   icon: { url: require('./images/icon/icon_hotel.png') },
            title: item.photo_title
         });
         Point.push(obj);
        });

        
       // d.push()


        // for (n:any = 0; n:a < d.length; n++) {
           
        //     }


        // var obj = new google.maps.Marker({
        //     position: { lat: point.Position.Latitude, lng: point.Position.Longitude },
        //     draggable: false,
        //     clickable: true,
        //     zIndex: 9999,
        //     icon: { url: point.IconType },
        //     title: point.Title
        // });
       
       
       
        var markerCluster = new MarkerClusterer(this.source.map,Point,mcOptions);
       // console.log('markerCluster',this.source.map,Point,d)
    }


    ngOnInit() {
        this.Init('google');

    }
}