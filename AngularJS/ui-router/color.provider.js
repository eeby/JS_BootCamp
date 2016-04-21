(function () {

    function Color() {

        var myClass;

        return{
            setClass: function(arg){
                myClass = arg;
            },
            $get: function(){
                return myClass;
            }
        }
    }

    angular.module('app')
        .provider('color', Color);


})();