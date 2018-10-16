import { AbstractMap } from "../abstract/abstract-map";
import { IPolygonOptions } from "../interfaces/i-polygon";

export class BasePolygon {

    map: AbstractMap;
    options: IPolygonOptions;

    constructor(options?: IPolygonOptions) {
        this.options = options;
    }

    setMap(map: AbstractMap): void { }
    setOptions(options: IPolygonOptions): void { }
    setRadius(radius: number): void { }
    setVisible(visible: boolean): void { }

}