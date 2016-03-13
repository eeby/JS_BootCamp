var myApp = myApp || {};

myApp.Shape = (function() {
    "use strict"

    function Shape(x, y) {

        this.x = x;
        this.y = y;
    }

    Shape.prototype.dump = function () {
        console.log('X: ' + this.x + ' Y: ' + this.y);
    }

    return Shape;
})();



