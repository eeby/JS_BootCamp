angular.module("myApp", []).run(function($rootScope) {
    var originalDigest = $rootScope.constructor.prototype.$digest;

    $rootScope.constructor.prototype.$digest = function () {
        var before = new Date();

        var res = originalDigest.apply(this, arguments);

        var after = new Date();

        console.log("DIGEST: " + (after - before));
        console.log("Watchers count: " + $rootScope.$$watchersCount);

        return res;
    }
});

