import { InitMap } from "../interface/interface-init";
import { EventMap } from "../interface/interface-event";
import { ConfigMap } from "../interface/interface-config";

export interface MainMap {
    map: any;
    init: InitMap;
    events: EventMap;
    config: ConfigMap;
}