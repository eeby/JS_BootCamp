angular.module("app")
    .directive("addContact", function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/add-contact.html',
        }
    });