"use strict"

var domHelpers = (function () {

    /**
     * Get selectors
     * @param parent
     * @param selector
     * @returns {*}
     */
    function getElement(parent, selector) {
        var res;

        if (selector == undefined) {
            //
            //  The caller sent only a selector without parent
            //
            selector = parent;
            res = $(selector);
        }
        else {
            //
            //  The caller sent a parent and a selector
            //
            res = parent.find(selector);
        }

        if (!res.length) {
            throw new Error("Cannot find element with selector: " + selector);
        }

        return res;
    }

    /**
     * Get native elements
     * @param jqElement
     * @returns {*}
     */
    function getNativeElement(jqElement) {
        if (!jqElement.length) {
            throw new Error("jQuery element is empty");
        }

        var domElement = jqElement[0];
        return domElement;
    }

    return {
        getElement: getElement,
        getNativeElement: getNativeElement,
    };

})();
