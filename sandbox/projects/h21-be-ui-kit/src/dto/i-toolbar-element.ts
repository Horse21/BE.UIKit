import { EventEmitter } from "events";

export interface IToolbarElement {
    condition: string;
    tooltip: string;
    icon: string;
    style: Array<string>;
<<<<<<< HEAD
    action: Function;
=======
    action: EventEmitter;
>>>>>>> 0f21e1ab2f10d4cd44a4cbe3b505179871a36f86
};