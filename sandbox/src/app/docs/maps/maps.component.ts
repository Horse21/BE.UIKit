import { Component, OnInit, AfterViewInit, Input,ViewChild } from '@angular/core';
import { Manager } from './class/class-imap-manager';
import { GoogleMap } from './class/google/class-main';
import { ObjectMap } from './class/class-objmap';
import { YandexMap } from './class/yandex/class-main';
import { BaiduMap } from './class/baidu/class-main';
import { LeafletMap } from './class/leaflet/class-main';
import { MapContainerComponent} from './map-container/map-container.component';
import { MapSelectorComponent} from './map-selector/map-selector.component';

@Component({
    selector: 'maps-components-docs',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css'],
    providers: [Manager, ObjectMap, GoogleMap, YandexMap, BaiduMap, LeafletMap]
})

export class MapsComponent implements OnInit, AfterViewInit {
@ViewChild(MapContainerComponent) private counterComponent: MapContainerComponent;
@ViewChild(MapSelectorComponent) private selectorComponent: MapSelectorComponent;
   
   

    ngAfterViewInit() {

    }
GetNativElement() : any{
  //  return this.counterComponent.setGMapElement()
}

    ngOnInit() {
    //  console.log('Map',this.counterComponent.setGMapElement())
    }
    ngOnDestroy() {
      
    }

}

