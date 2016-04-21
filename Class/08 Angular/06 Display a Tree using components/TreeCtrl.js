(function() {
    function TreeCtrl($scope) {
    }

    angular.module("myApp").directive("tree", function() {
        var ddo = {
            templateUrl: "tree.html",
            controller: TreeCtrl,
            scope: {
                nodes: "<",
            }
        };

        return ddo;
    });
})();
