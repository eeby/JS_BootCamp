"use strict"

function inherit(derived, base) {
    function Dummy() { }
    Dummy.prototype = base.prototype;
    derived.prototype = new Dummy();
}
