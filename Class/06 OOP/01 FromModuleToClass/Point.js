function Point(inX, inY) {
    var x = inX;
    var y = inY;

    function dump() {
        console.log(x + ", " + y);
    }

    function equals(pt) {
        return x==pt.getX() && y==pt.getY();
    }

    function getX() {
        return x;
    }

    function getY() {
        return y;
    }

    function blabla() {
        console.log(x + ", " + y);
    }

    return {
        dump: dump,
        getX: getX,
        getY: getY,
        equals: equals,
        blabla: blabla,
    };
}
