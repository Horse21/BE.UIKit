import { Component, OnInit, Output, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ILatLng } from '../providers/google/interfaces/i-latlng';
import { MapManager } from '../entity/map-manager';


@Component({
    selector: 'app-h21-maps',
    templateUrl: './h21-maps.component.html',
    styleUrls: ['./h21-maps.component.css']
})

@Injectable()
export class H21MapsComponent implements OnInit {

    @Output() AfterMapInit: Subject<boolean> = new Subject<boolean>();
    @Output() OnclickMapPlaceId: Subject<string> = new Subject<string>();
    @Output() onclickMapGetAddress: Subject<ILatLng> = new Subject<ILatLng>();

    constructor(public manager: MapManager) { }

    ngOnInit() {
        this.subscribeMethodsInit()
        setTimeout(() => {

            this.manager.getActiveMap().callbackMap.on('onclickMapPlaceId', (placeId) => {
                this.manager.getActiveMap().config.getDetailsPoint(placeId);

                this.OnclickMapPlaceId.next(placeId);
            });
            this.manager.getActiveMap().callbackMap.on('onclickMapGetAddress', (position) => {
                this.onclickMapGetAddress.next(position);
                console.log(position)
                this.manager.getActiveMap().config.getAddress(position);
            });

            this.manager.getActiveMap().callbackMap.on('getDetailsPoint', (point) => {
                this.manager.getActiveMap().config.showMarker(point, true);
            });

            this.manager.getActiveMap().callbackMap.on('changedBoundsMap', (bounds) => {
                console.log('changedBoundsMap', bounds);
            });

            this.manager.getActiveMap().callbackMap.on('initMap', () => {
                this.AfterMapInit.next(true);
            });

            this.manager.getActiveMap().callbackMap.on('responseMap', (status) => { });

            this.manager.getActiveMap().callbackMap.on('createRadius', (position, radius) => {
                console.log('radiusChanged', position, radius)
            });

            this.manager.getActiveMap().callbackMap.on('radiusChanged', (position, radius) => {
                console.log('radiusChanged', position, radius)
            });

            this.manager.getActiveMap().callbackMap.on('radiusDragEnd', (position, radius) => {
                console.log('radiusChangedDragend', position, radius);
            });

            this.manager.getActiveMap().callbackMap.on('drawAreaStart', (position) => {

            });
            this.manager.getActiveMap().callbackMap.on('drawAreaDragEnd', (position) => {

            });

            this.manager.getActiveMap().callbackMap.on('countLoadMarkers', (countLoadMarkers) => { });

            this.manager.getActiveMap().callbackMap.on('markerClick', (position) => { });

            this.manager.getActiveMap().callbackMap.on('markerDraggableEnd', (position, enabled) => { console.log('markerDraggableEnd', position) });

            this.manager.getActiveMap().callbackMap.on('markerDraggable', (position, enabled) => { console.log('markerDraggable', position, enabled) });

            this.manager.getActiveMap().callbackMap.on('getAddressPoint', (point) => {
                this.manager.getActiveMap().config.showMarker(point, true);
            });
        }, 500);
    }
    public subscribeMethodsInit() {
        this.OnclickMapPlaceId.subscribe(placeId => {

        });

    }
}
