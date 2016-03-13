var myApp = myApp || {};

myApp.Rect = (function() {
    "use strict"

    function Rect(x, y, width, heigth) {
        myApp.Shape.call(this, x, y);
        this.width = width;
        this.height = heigth;
    }

    Rect.prototype.dump = function () {
        myApp.Shape.prototype.dump.call(this);
        console.log('Width: ' + this.width + ' Heigth: ' + this.height);
    }

    return Rect;
})();
