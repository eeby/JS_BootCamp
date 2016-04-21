angular.module("myApp").controller("ToolbarCtrl", function($scope, $rootScope) {
    $scope.toggle = function() {
        $rootScope.showCtrl = !$rootScope.showCtrl; 
    }
});
