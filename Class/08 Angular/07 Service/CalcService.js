(function() {

    function CalcService() {
    }

    CalcService.prototype.calc = function (num1, num2) {
        var res = num1 + num2;
        return res;
    }

    angular.module("myApp").service("calcService", CalcService);

})();
