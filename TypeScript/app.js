require("./clock");
var appModule_1 = require("./appModule");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.onTick = function () {
    };
    return AppComponent;
})();
exports.AppComponent = AppComponent;
appModule_1.appModule.component("app", {
    controller: AppComponent,
    templateUrl: "./templates/appTemp.html"
});
//# sourceMappingURL=app.js.map