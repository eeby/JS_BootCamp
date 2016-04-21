var myApp;
(function (myApp) {
    var AppCtrl = (function () {
        function AppCtrl(calcService) {
            this.calcService = calcService;
        }
        AppCtrl.prototype.calc = function () {
            var num1 = parseInt(this.num1);
            var num2 = parseInt(this.num2);
            if (isNaN(num1) || isNaN(num2)) {
                return;
            }
            this.result = this.calcService.calc(num1, num2) + "";
        };
        return AppCtrl;
    })();
    angular.module("myApp").controller("AppCtrl", AppCtrl);
})(myApp || (myApp = {}));
//# sourceMappingURL=AppCtrl.js.map