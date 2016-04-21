(function () {
    "use strict"

    function HomeCtrl(calcService) {
        var self = this;

        this.arr = [2, 29];
        this.calcService = calcService;
        this.calcMultiVal = '';
        this.calcAddVal = '';

        this.calcService.multiply(self.arr)
            .then(function(data){
                self.calcMultiVal = '2 * 29 = ' + data;
                self.calcService.add([data, 20])
                    .then(function(data){
                        self.calcAddVal = self.calcMultiVal + ' + 20 = ' + data;
                    });
            });
    }

    angular.module("app")
        .controller("homeCtrl", HomeCtrl);
})();
