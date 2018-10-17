import { AbstractMarkerCluster } from "../abstract/abstract-marker-cluster";
import { BaseMarker } from "./base-marker";
import { IRouteInfo } from "../interfaces/i-route-info";
import { IPolygonOptions } from "../interfaces/i-polygon";
import { Injectable } from "@angular/core";
import { AbstractMap } from "../abstract/abstract-map";
import { ICircleOptions } from "../interfaces/i-circle-options";
import { BaseCicle } from "./base-circle";

@Injectable()
export class GeoContainer {

    map: AbstractMap;
    polygons: Array<IPolygonOptions>;
    routes: Array<IRouteInfo>;
    markers: Array<BaseMarker>;
    clusters: Array<AbstractMarkerCluster>;
    circle: BaseCicle;

    private clearArray<T>(array: Array<T>) {

        array = [];

    }

    clearPolygons(): void {

        this.clearArray(this.polygons);
        this.polygons = [];

    }

    clearRoutes(): void {

        this.clearArray(this.routes);
        this.routes = [];

    }

    clearCircle(): void {

        if (this.circle != null) {
            this.circle.setMap(null);
            this.circle = null;
        }
    }

    clearMarkers(): void {

        this.clearArray(this.markers);
        this.markers = [];
    }


    clearAllMap(): void {

        this.clearPolygons();
        this.clearMarkers();
        this.clearRoutes();
        this.clearCircle();

    }

    pushMarkers(markers: BaseMarker) {

        if (this.markers == null) {
            this.markers = new Array<BaseMarker>();
        }

        this.markers.push(markers);
    }

    pushPolygons(polygons: IPolygonOptions) {

        if (this.polygons == null) {
            this.polygons = new Array<IPolygonOptions>();
        }

        this.polygons.push(polygons);
    }


}