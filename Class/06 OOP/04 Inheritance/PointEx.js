function PointEx(x, y, z) {
    Point.call(this, x, y);

    this.z = z;
}

PointEx.prototype = Object.create(Point.prototype);

PointEx.prototype.dump = function () {
    console.log(this.x + ", " + this.y + ", " + this.z);
}