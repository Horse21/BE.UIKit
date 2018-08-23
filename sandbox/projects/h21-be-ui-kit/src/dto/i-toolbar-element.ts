import { EventEmitter } from "events";

export interface IToolbarElement {
    condition: string;
    tooltip: string;
    icon: string;
    style: Array<string>;
    action: EventEmitter;
};