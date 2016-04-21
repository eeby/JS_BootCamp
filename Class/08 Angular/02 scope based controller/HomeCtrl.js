var app = angular.module("myApp", []);

(function() {
    app.controller("HomeCtrl", function($scope) {
        $scope.counter = 0;

        $scope.contacts = [
            {id: 1, name: "Ori", email: "ori@gmail.com"},
            {id: 2, name: "Roni", email: "roni@gmail.com"},
        ];

        $scope.inc = function () {
            console.log("inc");

            ++$scope.counter;
        }

        $scope.remove = function (contact, index) {
            if (confirm("Do you want to delete contact " + contact.name + " ?")) {
                $scope.contacts.splice(index, 1);
            }
        }

        $scope.sayHello = function () {
            alert("Hello " + $scope.name);
        }

        $scope.reset = function () {
            $scope.name = "";
        }
    });

})();
