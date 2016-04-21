(function () {
    "use strict"

    function HomeCtrl() {
        this.grade = null;
        this.comment = null;
    }

    HomeCtrl.prototype.setComment = function(text){
        this.comment = text;
    }

    angular.module("app")
        .controller("HomeCtrl", HomeCtrl);

})();

