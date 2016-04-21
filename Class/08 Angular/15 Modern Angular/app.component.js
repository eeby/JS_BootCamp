(function() {

    function AppComponent() {
        //this.message = "123";
    }

    AppComponent.prototype.doSomething = function() {
        alert("XXX");
    }

    angular.module("myApp").directive("app", function() {
        return {
            templateUrl: "app.component.html",
            controller: AppComponent,
            restrict: "E",
            scope: {
                title: "<",
                color: "<"
            },
            bindToController: true,
            controllerAs: "ctrl",
        };
    });
})();
