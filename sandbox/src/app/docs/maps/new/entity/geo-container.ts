import { AbstractMarkerCluster } from "../abstract/abstract-marker-cluster";
import { BaseMarker } from "./base-marker";
import { IRouteInfo } from "../interfaces/i-route-info";
import { IPolygonOptions } from "../interfaces/i-polygon";

export class GeoContainer {

    polygons: Array<IPolygonOptions>;
    routes: Array<IRouteInfo>;
    private markers: Array<BaseMarker>;
    clusters: Array<AbstractMarkerCluster>;

    private clearArray<T>(array: Array<T>) {
        array = [];
    }

    clearPolygons(): void {

        this.clearArray(this.polygons);
    }

    clearRoutes(): void {

        this.clearArray(this.routes);
    }

    clearMarkers(): void {

        this.clearArray(this.markers);
    }

    clearClusters(): void {

        this.clearArray(this.clusters);
    }

    clearAll(): void {

        this.clearPolygons();
        this.clearClusters();
        this.clearMarkers();
        this.clearRoutes();

    }

    pushMarkers(markers: BaseMarker){
        if (this.markers == null){
            this.markers = new Array<BaseMarker>();
        }

        this.markers.push(markers);
    }
}