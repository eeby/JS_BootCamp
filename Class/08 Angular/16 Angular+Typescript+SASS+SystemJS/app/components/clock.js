"use strict";
var module_1 = require("../common/module");
var ClockComponent = (function () {
    function ClockComponent($interval) {
        this.$interval = $interval;
        this.id = ClockComponent.nextId++;
        this.time = new Date();
        this.start();
    }
    ClockComponent.prototype.start = function () {
        var _this = this;
        if (this.intervalId) {
            return;
        }
        this.time = new Date();
        this.intervalId = this.$interval(function () {
            _this.time = new Date();
            _this.onTick({ sender: _this, time: _this.time });
        }, 1000);
    };
    ClockComponent.prototype.stop = function () {
        if (this.intervalId) {
            this.$interval.cancel(this.intervalId);
            this.intervalId = null;
        }
    };
    ClockComponent.nextId = 1;
    return ClockComponent;
}());
exports.ClockComponent = ClockComponent;
module_1.module.component("clock", {
    template: require("./clock.html!text"),
    controller: ClockComponent,
    bindings: {
        format: "<",
        onTick: "&",
    }
});
//# sourceMappingURL=clock.js.map