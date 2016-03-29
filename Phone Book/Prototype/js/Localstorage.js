"use strict"

var myPhonebook = myPhonebook || {};

myPhonebook.Localstorage = (function () {

    var objString;

    /**
     *
     * @constructor
     */
    function Localstorage() {
        if (dispatcher) {
            dispatcher.on('UPDATE_LOCAL_STORAGE', this, this.updateLocalStorage);
        }

        this.local_storage = 'phonebook';
    }

    /**
     * Get data from localstorage
     * @returns {*}
     */
    Localstorage.prototype.getLocalStorage = function () {
        if (localStorage.getItem(this.local_storage)) {
            return localStorage.getItem(this.local_storage).split('|');
        }

        return null;
    }

    /**
     * Save data in localstorage
     * @param root
     */
    Localstorage.prototype.updateLocalStorage = function (root) {
        objString = '';
        convertObjectToString(root);
        localStorage.setItem(this.local_storage, objString);
    }

    /**
     * Convert object to string
     * @param currentGroup
     */
    function convertObjectToString(currentGroup) {
        convertGroupToString(currentGroup);
        currentGroup.items.forEach(function (item) {
            if (item.type.toUpperCase() == 'CONTACT') {
                convertContactToString(item);
            }
            else {
                convertObjectToString(item);
            }
        });
    }

    /**
     * Convert single group to string
     * @param item
     */
    function convertGroupToString(item) {
        if (item.id == -1) {
            objString += '{';
        }
        else {
            objString += '|{';
        }
        objString += '"type": "' + item.type + '",';
        objString += '"id": "' + item.id + '",';
        objString += '"name": "' + item.name + '",';
        objString += '"items": "' + item.childrenCount + '"';
        objString += '}';
    }

    /**
     * Convert single contact to string
     * @param item
     */
    function convertContactToString(item) {
        objString += '|{';
        objString += '"type": "' + item.type + '",';
        objString += '"id": "' + item.id + '",';
        objString += '"firstName": "' + item.firstName + '",';
        objString += '"lastName": "' + item.lastName + '",';
        objString += '"phoneNumbers": "' + item.phoneNumbers + '"';
        objString += '}';
    }

    return Localstorage;
})();

