angular.module("myCalc", []);

(function() {
    function CalcCtrl() {
        this.counter = 4;

        this.contacts = [
            {id:1, name: 'Eli'},
            {id:2, name: 'Racheli'},
            {id:3, name: 'Roni'},
            {id:4, name: 'Sarit'},
        ];
    }

    angular.module("myCalc").controller("calcCtrl", CalcCtrl);
})();
