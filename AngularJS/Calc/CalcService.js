var CalcService = (function () {
    function CalcService() {
    }
    CalcService.prototype.calc = function (num1, num2, opr) {
        switch (opr) {
            case '+':
                var res = num1 + num2;
                return res;
            case '-':
                var res = num1 - num2;
                return res;
        }
    };
    return CalcService;
})();
angular.module("myApp").service("calcService", CalcService);
//# sourceMappingURL=CalcService.js.map