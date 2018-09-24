import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { IMainMap } from '../interface/i-main';
import { MapSelectorComponent} from '../map-selector/map-selector.component';

@Component({
    selector: 'app-map-container',
    templateUrl: './map-container.component.html',
    styleUrls: ['./map-container.component.css']
})
export class MapContainerComponent implements OnInit {
    source: IMainMap;
    constructor() { 
       
    }
    ngOnInit() {
        
    }
}

