var appModule_1 = require("./appModule");
var ClockComponent = (function () {
    function ClockComponent($interval) {
        this.$interval = $interval;
        this.run();
    }
    ClockComponent.prototype.run = function () {
        var self = this;
        self.time = new Date();
        self.intervalId = self.$interval(function () {
            self.time = new Date();
            self.onTick({ sender: self, time: self.time });
        }, 1000);
    };
    return ClockComponent;
})();
exports.ClockComponent = ClockComponent;
appModule_1.appModule.component('clock1', {
    controller: ClockComponent,
    templateUrl: "./templates/clockTemp.html",
    bindings: {
        format: "<",
        onTick: "&"
    }
});
appModule_1.appModule.component('clock2', {
    controller: ClockComponent,
    templateUrl: "./templates/clockTemp.html",
    bindings: {
        format: "<",
        onTick: "&"
    }
});
//# sourceMappingURL=clock.js.map