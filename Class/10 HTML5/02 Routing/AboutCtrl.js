angular.module("MyApp").controller("AboutCtrl", 
    function(router, $scope, $attrs, $element) {
        
    router.register($attrs.url, $element);
    
    $scope.gotoUrl = function(url, $event) {
        router.navigate(url);
        
        $event.preventDefault();
    }
});
