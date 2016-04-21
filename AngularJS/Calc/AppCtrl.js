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
            this.num = this.calcService.calc(num1, num2, this.opr) + "";
            this.num1 = this.num2 = this.opr = '';
        };
        AppCtrl.prototype.getVal = function (val) {
            if (!this.num) {
                this.num = val;
            }
            else {
                this.num = this.num + '' + val;
            }
        };
        AppCtrl.prototype.getOperand = function (opr) {
            this.num1 = this.num;
            this.num = '';
            this.opr = opr;
        };
        AppCtrl.prototype.getSum = function () {
            this.num2 = this.num;
            this.calc();
        };
        return AppCtrl;
    })();
    angular.module("myApp").controller("AppCtrl", AppCtrl);
})(myApp || (myApp = {}));
//# sourceMappingURL=AppCtrl.js.map