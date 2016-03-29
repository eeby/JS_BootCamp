"use strict"

var myPhonebook = myPhonebook || {};

myPhonebook.MenuView = (function () {

    /**
     *
     * @param element
     * @constructor
     */
    function MenuView(element) {
        myPhonebook.View.call(this, element);

        this.getChildElement(".Add-Contact").click(this.addContact.bind(this));
        this.getChildElement(".Add-Group").click(this.addGroup.bind(this));
        this.getChildElement("#btnSearch").click(this.search.bind(this));
    }

    MenuView.prototype = Object.create(myPhonebook.View.prototype);

    /**
     * Add Group
     */
    MenuView.prototype.addGroup = function () {
        if (dispatcher) {
            dispatcher.emit('ADD_NEW_GROUP', {});
        }
    }

    /**
     * Add contact
     */
    MenuView.prototype.addContact = function () {
        if (dispatcher) {
            dispatcher.emit('ADD_NEW_CONTACT', {});
        }
    }

    /**
     * Search items
     */
    MenuView.prototype.search = function () {
        var obj = {
            text: $("#searchText").val(),
        }

        if (dispatcher) {
            dispatcher.emit('SEARCH', obj);
        }
    }

    return MenuView;
})();
