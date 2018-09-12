import { Component, OnInit } from '@angular/core';
import { MainMap } from '../interface/i-main';

@Component({
    selector: 'app-map-container',
    templateUrl: './map-container.component.html',
    styleUrls: ['./map-container.component.css']
})
export class MapContainerComponent implements OnInit {
    source: MainMap;
    constructor() { }
    ngOnInit() {
    }
}

