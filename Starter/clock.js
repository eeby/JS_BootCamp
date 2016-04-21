var appModule_1 = require("./appModule");
var ClockComponent = (function () {
    function ClockComponent($interval) {
        this.$interval = $interval;
        this.run();
    }
    ClockComponent.prototype.run = function () {
        this.time = new Date();
        this.intervalId = this.$interval(function () {
            this.time = new Date();
            this.onTick(this.time);
        }, 1000);
    };
    return ClockComponent;
})();
exports.ClockComponent = ClockComponent;
appModule_1.appModule.component('home', {
    controller: ClockComponent,
    templateUrl: "./templates/clock.html",
    bindings: {
        onTick: '&'
    }
});
//# sourceMappingURL=clock.js.map