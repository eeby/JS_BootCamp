"use strict";
var module_1 = require("../common/module");
require("./clock");
require("./contactList");
var AppComponent = (function () {
    function AppComponent() {
        this.contacts1 = [
            { id: 1, name: "Ori" },
            { id: 2, name: "Roni" },
        ];
        this.contacts2 = [
            { id: 2, name: "Roni" },
            { id: 1, name: "Ori" },
        ];
    }
    AppComponent.prototype.onReverse = function () {
        //alert("R");
        this.contacts1.reverse();
    };
    AppComponent.prototype.onTick = function (sender, time) {
        console.log(sender.id + ": " + time);
    };
    return AppComponent;
}());
exports.AppComponent = AppComponent;
module_1.module.component("app", {
    template: require("./app.html!text"),
    controller: AppComponent,
});
//# sourceMappingURL=app.js.map