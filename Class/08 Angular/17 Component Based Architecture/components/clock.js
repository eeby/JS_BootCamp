/// <reference path="../typings/tsd.d.ts" />
"use strict";
var appModule_1 = require("../common/appModule");
console.log("app");
var ClockComponent = (function () {
    function ClockComponent() {
    }
    return ClockComponent;
}());
exports.ClockComponent = ClockComponent;
appModule_1.appModule.component("clock", {
    controller: ClockComponent,
    template: require("./clock.html!text"),
    styles: require("./clock.css!css"),
});
//# sourceMappingURL=clock.js.map