import { Component, OnInit, Output } from '@angular/core';
import { MapManager } from './entity/map-manager';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs/internal/Subject';

@Component({
    selector: 'maps-components-docs',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css'],
    providers: []
})

@Injectable()
export class MapsComponent implements OnInit {

    @Output() AfterMapInit: Subject<boolean>;

    constructor(public manager: MapManager) { }

    ngOnInit() {
        setTimeout(() => {
            this.manager.getActiveMap().callbackMap.on('onclickMapPlaceId', (placeId) => {
                this.manager.getActiveMap().config.getDetailsPoint(placeId);
            });
            this.manager.getActiveMap().callbackMap.on('onclickMapGetAddress', (position) => {
                this.manager.getActiveMap().config.getAddress(position);
            });

            this.manager.getActiveMap().callbackMap.on('getDetailsPoint', (point) => {
                this.manager.getActiveMap().config.showMarker(point, true);
            });

            this.manager.getActiveMap().callbackMap.on('initMap', () => {
                this.AfterMapInit.next();
            });

            this.manager.getActiveMap().callbackMap.on('responseMap', (status) => { });

            this.manager.getActiveMap().callbackMap.on('radiusChanged', (radius) => { });

            this.manager.getActiveMap().callbackMap.on('radiusChangedDragend', (radius) => { });

            this.manager.getActiveMap().callbackMap.on('countLoadMarkers', (countLoadMarkers) => { });

            this.manager.getActiveMap().callbackMap.on('markerClick', (selectedMarker) => { });

            this.manager.getActiveMap().callbackMap.on('markerDragend', (marker) => { });

            this.manager.getActiveMap().callbackMap.on('getAddressPoint', (point) => {
                this.manager.getActiveMap().config.showMarker(point, true);
            });
        }, 500);
    }
}

