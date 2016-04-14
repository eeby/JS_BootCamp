angular.module("app")
    .directive("addGroup", function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/add-group.html',
        }
    });
