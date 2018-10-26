import { Component, OnInit, Output, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ILatLng } from '../providers/google/interfaces/i-latlng';
import { MapManager } from '../entity/map-manager';
import { IPoint } from '../interfaces/i-point';
import { IPosition } from '../interfaces/i-position';
import { BoundsMap } from '../providers/google/classes/bounds-map';


@Component({
    selector: 'h21-maps',
    templateUrl: './h21-maps.component.html',
    styleUrls: ['./h21-maps.component.css']
})

@Injectable()
export class H21MapsComponent implements OnInit {

    @Output() afterMapInit: Subject<boolean> = new Subject<boolean>();
    @Output() onclickMapPlaceId: Subject<IPosition> = new Subject<IPosition>();
    @Output() onclickMapCoordinates: Subject<IPosition> = new Subject<IPosition>();

    @Output() onChangeBoundsMap: Subject<BoundsMap> = new Subject<BoundsMap>();
    @Output() responseMapError: Subject<string> = new Subject<string>();

    @Output() searchMapResult: Subject<IPoint[]> = new Subject<IPoint[]>();
    @Output() searchMapDetailsResult: Subject<IPoint> = new Subject<IPoint>();

    @Output() geocoderAddressResultPoint: Subject<IPoint> = new Subject<IPoint>();
    @Output() detailsAddressResultPoint: Subject<IPoint> = new Subject<IPoint>();

    @Output() markerClik: Subject<IPosition> = new Subject<IPosition>();
    @Output() markerDraggable: Subject<any> = new Subject<any>();
    @Output() markerDraggableEnd: Subject<any> = new Subject<any>();

    @Output() drawRadiusStart: Subject<string> = new Subject<string>();
    @Output() drawRadiusChanged: Subject<string> = new Subject<string>();
    @Output() drawRadiusDragEnd: Subject<string> = new Subject<string>();

    @Output() drawAreaStart: Subject<string> = new Subject<string>();
    @Output() drawAreaDragEnd: Subject<string> = new Subject<string>();

    @Output() countLoadsMarkers: Subject<number> = new Subject<number>();

    constructor(public manager: MapManager) { }

    ngOnInit() {
        setTimeout(() => {
            this.manager.getActiveMap().callbackMap.on('onclickMapPlaceId', (placeId) => {
                this.onclickMapPlaceId.next(placeId);
            });
            this.manager.getActiveMap().callbackMap.on('onclickMapGetAddress', (position) => {
                this.onclickMapCoordinates.next(position);
            });
            this.manager.getActiveMap().callbackMap.on('detailsAddressResultPoint', (point) => {
                this.detailsAddressResultPoint.next(point);
            });
            this.manager.getActiveMap().callbackMap.on('geocoderAddressResultPoint', (point) => {
                this.geocoderAddressResultPoint.next(point);
            });
            this.manager.getActiveMap().callbackMap.on('searchResult', (arrayPoint) => {
                this.searchMapResult.next(arrayPoint);
            });

            this.manager.getActiveMap().callbackMap.on('searchDetailsResult', (point) => {
                this.searchMapDetailsResult.next(point);
            });

            this.manager.getActiveMap().callbackMap.on('changedBoundsMap', (bounds) => {
                this.onChangeBoundsMap.next(bounds);
            });
            this.manager.getActiveMap().callbackMap.on('initMap', (status) => {
                this.afterMapInit.next(status);
            });
            this.manager.getActiveMap().callbackMap.on('responseMapError', (status) => {
                this.responseMapError.next(status);
            });
            this.manager.getActiveMap().callbackMap.on('createRadius', (position, radius) => {
                this.drawRadiusStart.next(position);
            });
            this.manager.getActiveMap().callbackMap.on('radiusChanged', (position, radius) => {
                this.drawRadiusChanged.next(position);
            });
            this.manager.getActiveMap().callbackMap.on('radiusDragEnd', (position, radius) => {
                this.drawRadiusDragEnd.next(position);
            });
            this.manager.getActiveMap().callbackMap.on('drawAreaStart', (position) => {
                this.drawAreaStart.next(position);
            });
            this.manager.getActiveMap().callbackMap.on('drawAreaDragEnd', (arrayCoordinates) => {
                this.drawAreaDragEnd.next(arrayCoordinates);
            });
            this.manager.getActiveMap().callbackMap.on('countLoadMarkers', (countLoadMarkers) => {
                this.countLoadsMarkers.next(countLoadMarkers);
            });

            this.manager.getActiveMap().callbackMap.on('markerClick', (pointId) => {
                this.markerClik.next(pointId);
            });
            this.manager.getActiveMap().callbackMap.on('markerDraggableEnd', (position, enabled, pointId) => {
                this.markerDraggableEnd.next(position);
            });

            this.manager.getActiveMap().callbackMap.on('markerDraggable', (position, enabled, pointId) => {
                this.markerDraggable.next(position);
            });
        }, 500);
    }
}
