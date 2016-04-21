function HomeCtrl($scope, $timeout) {
    var ori = {id:1, name: "Ori"};
    var roni = {id:2, name: "Roni"};

    $scope.contacts = [
        ori,
        roni,
    ];

    $scope.change = function() {
        $scope.contacts.push({id:3, name: "Udi"});

        $scope.contacts[0].name = "XXX";
    }
}

angular.module("myApp").controller("HomeCtrl", HomeCtrl);
