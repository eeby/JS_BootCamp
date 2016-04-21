(function () {

    function Main(myClass) {
        this.myClass = myClass;
    }

    angular.module('app')
        .controller('Main', ['color', Main]);

})();