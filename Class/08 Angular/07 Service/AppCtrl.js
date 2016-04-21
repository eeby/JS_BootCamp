(function() {

    function AppCtrl(calcService) {
        this.calcService = calcService;

        console.log("%O", calcService);
    }

    AppCtrl.prototype.calc = function () {
        var num1 = this.num1 * 1;
        var num2 = this.num2 * 1;

        if (isNaN(num1) || isNaN(num2)) {
            return;
        }

        this.result = this.calcService.calc(num1, num2);
    }

    angular.module("myApp").controller("AppCtrl", AppCtrl);

})();
