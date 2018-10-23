import { AbstractSearch } from "../../abstract/abstract-search";
import { Injectable } from "@angular/core";
import { IPoint } from "../../interfaces/i-point";


@Injectable()
export class BaiduSearchMap extends AbstractSearch {

    search(query: string): IPoint[] {
        throw new Error("Method not implemented.");
    }

    

}