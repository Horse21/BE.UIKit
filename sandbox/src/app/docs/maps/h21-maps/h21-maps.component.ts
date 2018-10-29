import { Component, OnInit, Output, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ILatLng } from '../providers/google/interfaces/i-latlng';
import { MapManager } from '../entity/map-manager';
import { IPoint } from '../interfaces/i-point';
import { IPosition } from '../interfaces/i-position';
import { BoundsMap } from '../providers/google/classes/bounds-map';
import { CallbackName } from '../enum/e-callback-name';
import { MapType } from '../enum/e-map-type';


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
    @Output() geocoderAddressResult: Subject<IPoint> = new Subject<IPoint>();
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
    @Output() infoRoute: Subject<number> = new Subject<number>();

    constructor(public manager: MapManager) { }


    public InitMap(mapType: MapType) {

        this.manager.selectMap(mapType);
      }
    
      ngAfterViewInit(): void {
    
        this.InitMap(MapType.GOOGLE);
    
      }

    ngOnInit() {
        setTimeout(() => {
            this.manager.getActiveMap().callbackMap.on(CallbackName.onclickMapPlaceId, (placeId) => {
                this.onclickMapPlaceId.next(placeId);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.onclickMapCoordinates, (position) => {
                this.onclickMapCoordinates.next(position);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.detailsAddressResultPoint, (point) => {
                this.detailsAddressResultPoint.next(point);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.geocoderAddressResult, (point) => {
                this.geocoderAddressResult.next(point);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.searchResult, (arrayPoint) => {
                this.searchMapResult.next(arrayPoint);
            });

            this.manager.getActiveMap().callbackMap.on(CallbackName.searchDetailsResult, (point) => {
                this.searchMapDetailsResult.next(point);
            });

            this.manager.getActiveMap().callbackMap.on(CallbackName.changedBoundsMap, (bounds) => {
                this.onChangeBoundsMap.next(bounds);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.initMap, (status) => {
                this.afterMapInit.next(status);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.responseMapError, (status) => {
                this.responseMapError.next(status);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.createRadius, (infoCicle) => {
                this.drawRadiusStart.next(infoCicle);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.radiusChanged, (infoCicle) => {
                this.drawRadiusChanged.next(infoCicle);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.radiusDragEnd, (infoCicle) => {
                this.drawRadiusDragEnd.next(infoCicle);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.drawAreaStart, (position) => {
                this.drawAreaStart.next(position);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.drawAreaDragEnd, (arrayCoordinates) => {
                this.drawAreaDragEnd.next(arrayCoordinates);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.countLoadMarkers, (countLoadMarkers) => {
                this.countLoadsMarkers.next(countLoadMarkers);
            });

            this.manager.getActiveMap().callbackMap.on(CallbackName.markerClick, (pointId) => {
                this.markerClik.next(pointId);
            });
            this.manager.getActiveMap().callbackMap.on(CallbackName.markerDraggableEnd, (infoMarker) => {
                this.markerDraggableEnd.next(infoMarker);
            });

            this.manager.getActiveMap().callbackMap.on(CallbackName.markerDraggable, (infoMarker) => {
                this.markerDraggable.next(infoMarker);
            });

            this.manager.getActiveMap().callbackMap.on(CallbackName.infoRoute, (infoRoute) => {
                this.infoRoute.next(infoRoute);
            });
        }, 500);
    }
}
