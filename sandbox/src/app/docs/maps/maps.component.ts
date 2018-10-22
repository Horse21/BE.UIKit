import { Component, OnInit } from '@angular/core';
import { MapManager } from './entity/map-manager';
import { Injectable } from "@angular/core";

@Component({
    selector: 'maps-components-docs',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css'],
    providers: []
})

@Injectable()
export class MapsComponent implements OnInit {

    constructor(private manager: MapManager) { }

    ngOnInit() {

        setTimeout(() => {
            this.manager.getActiveMap().callbackMap.on('onclickMapPlaceId', (placeId) => {

                this.manager.getActiveMap().config.getDetailsPoint(placeId);
            });
            this.manager.getActiveMap().callbackMap.on('onclickMapGetAddress', (position) => {

                this.manager.getActiveMap().config.getAddress(position);
            });

            this.manager.getActiveMap().callbackMap.on('getDetailsPoint', (point) => {

                this.manager.getActiveMap().config.showMarker(point, false);

            });

            this.manager.getActiveMap().callbackMap.on('getAddressPoint', (point) => {

                this.manager.getActiveMap().config.showMarker(point, false);

            });
        }, 1000);

    }
}

