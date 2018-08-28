import { MapManager } from "../interface/i-map-manager";
import { Component, OnInit } from '@angular/core';
import { GoogleMap } from '../class/google/class-main';
import { MainMap } from '../interface/i-main';
import * as data from "./maps.const.json";


export class Manager implements MapManager {
    source: MainMap;
    registrationMap(code:string){
        switch (code) {
            case "yandex": {
               
            }
            case "leaftlet": {
               
            }
            case "baidu": {
                
            }
            default: {
                this.source = new GoogleMap();
            }
        }
    }
    resultMap(): any{

    }
}