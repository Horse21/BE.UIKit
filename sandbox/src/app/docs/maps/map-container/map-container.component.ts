import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MainMap } from '../interface/i-main';
import { Manager } from '../class/class-imap-manager';
import { MapType } from '../interface/i-map-manager';

@Component({
    selector: 'app-map-container',
    templateUrl: './map-container.component.html',
    styleUrls: ['./map-container.component.css']
})
export class MapContainerComponent implements OnInit {
    source: MainMap;
    @ViewChild('mapContainer') mapContainer: ElementRef;

    constructor(private manager: Manager) {

    }
    public selectMap(val) {


        
        console.log('val', val)
    }

    ngAfterViewInit() {
        console.log(this.mapContainer);
    }

    ngOnInit() {
        this.manager.registrationMap(MapType.baidu).load(this.mapContainer.nativeElement.id);
    }
}


// Angular calls this when necessary

