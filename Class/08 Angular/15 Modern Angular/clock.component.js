(function() {

    function ClockComponent($interval) {
        var me = this;

        me.time = new Date();

        $interval(function() {
            me.time = new Date();
        }, 1000);
    }
    
    angular.module("myApp").directive("clock", function() {
        return {
            templateUrl: "clock.component.html",
            controller: ClockComponent,
            restrict: "E",
            scope: {
                format: "<"
            },
            bindToController: true,
            controllerAs: "ctrl",
        };
    });
})();
