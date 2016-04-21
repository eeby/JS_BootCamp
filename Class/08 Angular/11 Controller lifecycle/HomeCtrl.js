function HomeCtrl($scope, $rootScope, eventDispatcherService) {
    var me = this;

    console.log("HomeCtrl ctor");

    var off = $rootScope.$on("blabla", function() {
    });

    //eventDispatcherService.register(me);

    $scope.$on("$destroy", function() {
        //eventDispatcherService.unregister(me);
        off();
    });
}

angular.module("myApp").controller("HomeCtrl", HomeCtrl);
