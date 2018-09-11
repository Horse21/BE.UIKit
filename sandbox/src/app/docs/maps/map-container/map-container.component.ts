import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MainMap } from '../interface/i-main';
import { Manager } from '../class/class-imap-manager';
import { MapType } from '../interface/i-map-manager';
import { Location } from '@angular/common';
import { initDomAdapter } from '@angular/platform-browser/src/browser';

@Component({
    selector: 'app-map-container',
    templateUrl: './map-container.component.html',
    styleUrls: ['./map-container.component.css']
})
export class MapContainerComponent implements OnInit {
    source: MainMap;
    type = MapType.leaflet  
    @ViewChild('mapContainer') mapContainer: ElementRef;

    constructor(private manager: Manager, private location: Location) {

    }

    onSubmit() {
      //  this.type = MapType.baidu; 
       // this.ngOnInit();
    }

    ngOnDestroy() { console.log('DESTROY') }

    public selectMap(val:string) {
      
      let ss = this.source;
      this.manager.destroy();
     // ss.init.destroyMap();
        this.type = MapType[val]
       // this.ngOnDestroy();
        this.ngOnInit();


  console.log('val', val)
    }

    public InitMap() {
        console.log('InitMap',this.type)
        this.manager.registrationMap(this.type).load(this.mapContainer.nativeElement.id);
    }

    ngAfterViewInit() {
        console.log(this.mapContainer);
    }

    ngOnInit() {  
        this.InitMap()
    }
}


// Angular calls this when necessary

