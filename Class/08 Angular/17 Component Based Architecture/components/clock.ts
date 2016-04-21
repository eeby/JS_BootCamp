/// <reference path="../typings/tsd.d.ts" />

import {appModule} from "../common/appModule";

console.log("app");

export class ClockComponent {
    constructor() {
    }
}

appModule.component("clock", <any>{
    controller: ClockComponent,
    template: require("./clock.html!text"),
    styles: require("./clock.css!css"),
});
