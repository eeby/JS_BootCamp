angular.module("app")
    .directive("navBar", function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/nav-bar.html',
        }
    });