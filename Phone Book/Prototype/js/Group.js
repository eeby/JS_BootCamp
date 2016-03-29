"use strict"

var myPhonebook = myPhonebook || {};

myPhonebook.Group = (function () {

    /**
     * Create new group
     * @param name
     * @constructor
     */
    function Group(name, nextID) {
        this.id = nextID;
        this.type = 'GROUP';
        this.name = name;
        this.items = [];
        this.childrenCount = 0;
    }

    return Group;
})();

