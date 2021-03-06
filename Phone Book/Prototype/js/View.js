"use strict"

var myPhonebook = myPhonebook || {};

myPhonebook.View = (function () {

    /**
     *
     * @param element
     * @constructor
     */
    function View(element) {
        if (!element) {
            throw new Error("View.ctor.element is missing");
        }

        this.element = element;
    }

    /**
     * Get child element
     * @param selector
     * @returns {*|{}}
     */
    View.prototype.getChildElement = function (selector) {
        var res = this.element.find(selector);
        if (!res.length) {
            throw new Error("Selector: " + selector + " was not found");
        }

        return res;
    }

    return View;
})();
