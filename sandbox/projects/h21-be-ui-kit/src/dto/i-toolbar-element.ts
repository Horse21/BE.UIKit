import { EventEmitter } from "events";

export interface IToolbarElement {
    condition: boolean;
    tooltip: string;
    icon: string;
    style: Array<string>;
    action: EventEmitter;
};