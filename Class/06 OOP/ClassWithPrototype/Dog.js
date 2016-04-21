var myApp = myApp || {};

myApp.Dog = (function(Animal) {
    "use strict";

    function Dog(name, owner) {
        Animal.call(this, name);

        this.owner = owner;
    }

    Dog.prototype = Object.create(Animal.prototype);

    Dog.prototype.burk = function () {
        console.log("Burking ...");
    }

    Dog.prototype.walk = function () {
        console.log("Walking the dog");

        Animal.prototype.walk.call(this);
    }

    return Dog;
})(myApp.Animal);
