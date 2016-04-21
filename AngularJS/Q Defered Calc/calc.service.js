(function () {
    "use strict"

    function CalcService($q, $timeout) {

        var multiply = function (args) {
            var deferred = $q.defer();

            $timeout(function () {
                deferred.resolve(args[0] * args[1]);

            }, 1000);
            return deferred.promise;
        }

        var add = function (args) {
            var deferred = $q.defer();

            $timeout(function () {
                deferred.resolve(args[0] + args[1]);

            }, 1000);
            return deferred.promise;
        }

        return {
            multiply: multiply,
            add: add,
        }
    }

    angular.module("app")
        .factory('calcService', CalcService);
})();