import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ILatLng } from '../providers/google/interfaces/i-latlng';
import { MapManager } from '../entity/map-manager';

@Component({
  selector: 'app-h21-maps',
  templateUrl: './h21-maps.component.html',
  styleUrls: ['./h21-maps.component.css']
})
export class H21MapsComponent implements OnInit {

 
  @Output() AfterMapInit: Subject<boolean>;
  @Output() OnclickMapPlaceId: Subject<string>;
  @Output() onclickMapGetAddress: Subject<ILatLng>;

  constructor(public manager: MapManager) {

      this.AfterMapInit = new Subject<boolean>();
      this.OnclickMapPlaceId = new Subject<string>();
      this.onclickMapGetAddress = new Subject<ILatLng>();
  }

  ngOnInit() {
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

        this.manager.getActiveMap().callbackMap.on('initMap', () => {
            this.AfterMapInit.next(true);
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
