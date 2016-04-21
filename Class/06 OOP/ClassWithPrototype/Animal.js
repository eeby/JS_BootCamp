var myApp = myApp || {};

myApp.Animal = (function() {
    "use strict";

    function Animal(name) {
        this.name = name;
    }

    Animal.prototype.walk = function () {
        console.log("Walking...");
    }

    return Animal;
})();
