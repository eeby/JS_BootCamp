angular.module("MyApp").controller("HomeCtrl",
    function(router, $scope, $attrs, $element) {
    router.register($attrs.url, $element);

    $scope.gotoUrl = function(url, $event) {
        router.navigate(url);

        $event.preventDefault();
    }
});
