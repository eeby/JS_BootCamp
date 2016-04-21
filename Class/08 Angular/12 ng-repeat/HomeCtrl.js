function HomeCtrl($scope, $timeout) {
    var ori = {id:1, name: "Ori"};
    var roni = {id:2, name: "Roni"};

    $scope.contacts = [
        ori,
        roni,
    ];

    $scope.toggle = function() {

        $scope.contacts = [
            ori,
            roni,
            ori,
        ];

        // $scope.contacts[0] = roni; //{id:2, name: "Roni"};
        // $scope.contacts[1] = ori;
    }

    $timeout(function() {
        console.log(JSON.stringify($scope.contacts));
    }, 1000);
}

angular.module("myApp").controller("HomeCtrl", HomeCtrl);

function SecondCtrl($scope) {
    console.log("SecondCtrl ctor: " + $scope.contact.name);

    $scope.$on("$destroy", function() {
        console.log("SecondCtrl dtor: " + $scope.contact.name);
    });
}

angular.module("myApp").controller("SecondCtrl", SecondCtrl);

