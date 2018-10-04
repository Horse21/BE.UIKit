import { Component, OnInit, Input } from '@angular/core';
import { MapManager } from '../new/entity/map-manager';


@Component({
    selector: 'app-map-container',
    templateUrl: './map-container.component.html',
    styleUrls: ['./map-container.component.css']
})
export class MapContainerComponent implements OnInit {

    constructor(private manager: MapManager) {}

    @Input() private latitude: number;
    @Input() private longitude: number;
    @Input() private zoom: number;
    @Input() private minZoom: number;

    ngOnInit() {
        setTimeout(() => {
            this.manager.getActiveMap().config.setMinZoom(3);
        }, 300);
    }
}

