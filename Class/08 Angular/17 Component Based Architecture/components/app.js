/// <reference path="../typings/tsd.d.ts" />
"use strict";
var appModule_1 = require("../common/appModule");
require("./clock");
console.log("app");
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
appModule_1.appModule.component("app", {
    controller: AppComponent,
    template: require("./app.html!text"),
    styles: require("./app.css!css"),
});
//# sourceMappingURL=app.js.map