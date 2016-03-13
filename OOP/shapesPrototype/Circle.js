var myApp = myApp || {};

myApp.Circle = (function() {
    "use strict"

    function Circle(x, y, radius) {
        myApp.Shape.call(this, x, y);
        this.radius = radius;
    }

    Circle.prototype.dump = function () {
        myApp.Shape.prototype.dump.call(this);
        console.log('Radius: ' + this.radius);
    }

    return Circle;
})();
