(function () {

    angular.module('app')

        .config(function ($stateProvider, $urlRouterProvider, colorProvider) {

            console.log(colorProvider);
            colorProvider.setClass('pink');

            //
            // For any unmatched url, redirect to /stateFirst
            $urlRouterProvider.otherwise("/stateFirst");
            //
            // Now set up the states
            $stateProvider
                .state('stateFirst', {
                    url: "/stateFirst",
                    templateUrl: "templates/stateFirst.html",
                    controller: function ($scope, $stateParams) {
                        $scope.color = $stateParams.color;
                    }

                })
                .state('stateFirst.list', {
                    url: "/list",
                    templateUrl: "templates/stateFirst.list.html",
                    controller: function ($scope, $stateParams) {
                        $scope.items = ["Eli", "Roni", "Eitan", "Rafi"];
                        $scope.color = $stateParams.color;
                    }

                })
                .state('stateSecond', {
                    url: "/stateSecond",
                    templateUrl: "templates/stateSecond.html",
                    controller: function ($scope, $stateParams) {
                        $scope.color = $stateParams.color;
                    }

                })
                .state('stateSecond.list', {
                    url: "/list",
                    templateUrl: "templates/stateSecond.list.html",
                    controller: function ($scope) {
                        $scope.things = ["Sarit", "Racheli", "Merav", "Amor"];
                    }
                });
        });


})();