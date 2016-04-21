function HomeCtrl($scope, $timeout) {
    $scope.save = function() {
        if($scope.form.$invalid) {
            return;
        }

        console.log("Saving ...");
    }
}

angular.module("myApp").controller("HomeCtrl", HomeCtrl);
