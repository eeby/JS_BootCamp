/// <reference path="../typings/tsd.d.ts" />

import {appModule} from "../common/appModule";
import {ClockComponent} from "./clock";
import "./clock";

console.log("app");

class AppComponent {
    constructor() {
    }
}

appModule.component("app", <any>{
    controller: AppComponent,
    template: require("./app.html!text"),
    styles: require("./app.css!css"),
});
