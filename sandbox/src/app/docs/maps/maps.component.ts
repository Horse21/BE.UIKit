import { Component, OnInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { GoogleMap } from './class/google/class-main';
import { LoadApiMap, InitMap } from "./interface/interface-init";
import { MapOptions } from "./interface/interface-config";
import * as data from "./maps.const.json";
import { MarkerMap } from './interface/interface-marker';
import { MainMap } from './interface/interface-main';
import { InfoWindowMap } from './interface/interface-infowindow';
import { MarkerClusterMap } from './interface/interface-markercluster';
import * as markercluster from "./markercluster.json";
import * as markers from "./test.markers.json";
//import * as MarkerClusterer from '@google/markerclustererplus';

declare var google: any;
var source: any;

@Component({
    selector: 'maps-components-docs',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css'],
})

export class MapsComponent implements OnInit {
    point: any[];
    source: MainMap;
    public Init(code: string) {
        switch (code) {
            case "yandex": {
                //this.script = new YandexMap();
            }
            case "leaftlet": {
                //this.script = new LeaftletMap();
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
                this.source.events.Subscribe(this.source.map);

                console.log('load', load)

                var Point = [];

                var d = markers['default'];
                console.log(this.source.markercluster, 'TESTMARKERS')
                d.forEach((item, index) => {
                    this.source.config.ShowMarker(this.source.map, item, load.markercluster)

                    // var obj = new google.maps.Marker({
                    //     position: { lat: item.latitude, lng: item.longitude },
                    //     draggable: false,
                    //     clickable: true,
                    //     icon: { url: require('./images/icon/icon_hotel.png') },
                    //     title: item.photo_title
                    // });
                    // Point.push(obj);
                });




                //  load.markercluster.addMarkers(Point);



                // setTimeout(() => this.loadScript(), 6000)
            }
        }).
            catch(error => console.log(error));
    }


    public zoomLevel(type) {
        console.log(type, 'type');
        this.source.config.SetZoomLevel(this.source.map, type);
    }

    public drawShape(type) {

        this.source.config.DrawingShapesMap(this.source.map, type);
    }

    public createMarker(type) {

        this.source.config.SetZoomLevel(this.source.map, 'plus');
    }

    public loadMarkers() {

        this.source.config.SetZoomLevel(this.source.map, 'plus');
    }

    public loadScript() {



        //  setTimeout(() => this.MarkerCluster(), 2000)
    }

    public MarkerCluster() {
        // var mcOptions = {
        //     gridSize: 80, maxZoom: 18, zoomOnClick: true, ignoreHidden: true, styles: [
        //         {
        //             textColor: 'black',
        //             url: require('./images/icon/icon_pointGroup.png'),
        //             anchorText: [0, -2],
        //             height: 44,
        //             width: 44
        //         }]
        // };

        // var Point = [];
        // var d = markercluster['default']['photos'];



        //  var mc = new MarkerClusterer(this.source.map, Point, mcOptions);
        // console.log(mc)
    }

    public TestFuncton() {
        //setTimeout(() => this.source.config.TrafficLayer(this.source.map,this.source.traffic,true),2000)

        // setTimeout(() => this.source.config.TrafficLayer(this.source.map,this.source.traffic,false),4000)
    }

    ngOnInit() {
        this.Init('google');

    }
}