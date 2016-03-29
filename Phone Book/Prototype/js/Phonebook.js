"use strict"

var myPhonebook = myPhonebook || {};

myPhonebook.Phonebook = (function () {

    var arrIndex = 0;

    /**
     *
     * @param phonebookArr
     * @constructor
     */
    function Phonebook(phonebookArr) {
        if (dispatcher) {
            dispatcher.on('CREATE_CONTACT', this, this.addContact);
            dispatcher.on('UPDATE_CONTACT', this, this.updateContact);

            dispatcher.on('CREATE_GROUP', this, this.addGroup);
            dispatcher.on('UPDATE_GROUP', this, this.updateGroup);


            dispatcher.on('DELETE', this, this.delete);
            dispatcher.on('SEARCH', this, this.search);
            dispatcher.on('CHANGE_GROUP', this, this.changeCurrentGroupByClick);
        }

        this.root = null;
        this.currentGroup = null;
        this.nextID = 1;
    }

    /**
     * Load phonebook data
     * @param phonebookArr
     * @returns {null|*}
     * @constructor
     */
    Phonebook.prototype.LoadPhonebook = function (phonebookArr) {
        if (phonebookArr) {
            // root object
            var obj = JSON.parse(phonebookArr[arrIndex]);
            arrIndex++;

            this.currentGroup = this.root = new myPhonebook.Group(obj.name, obj.id);

            var rootItems = obj.items;

            for (var i = 0; i < rootItems; i++) {
                obj = JSON.parse(phonebookArr[arrIndex]);
                arrIndex++;
                this.addGroupsAndContactsToPhoneBook(obj, phonebookArr);
                this.currentGroup = this.root;
            }
        }
        else {
            this.root = new myPhonebook.Group('Phone Book', -1);
        }

        this.currentGroup = this.root;
        dispatcher.emit('UPDATE_DOM', this.currentGroup);
        return this.root;
    }

    /**
     * Add contacts and groups from local storage
     * @param currentObj
     * @param dataArr
     */
    Phonebook.prototype.addGroupsAndContactsToPhoneBook = function (currentObj, dataArr) {
        if (currentObj.type.toUpperCase() == 'GROUP') {
            var group = this.addGroup(currentObj);

            this.currentGroup = group;
            var currItems = currentObj.items;
            for (var i = 0; i < currItems; i++) {
                var obj = JSON.parse(dataArr[arrIndex]);
                arrIndex++;

                this.addGroupsAndContactsToPhoneBook(obj, dataArr);
            }

            this.currentGroup = this.currentGroup.parent;
        }
        else {
            this.addContactToPhoneBook(currentObj);
        }
    }

    /**
     * Add contact from local storage
     * @param currentObj
     */
    Phonebook.prototype.addContactToPhoneBook = function (currentObj) {
        var phoneNumbers = currentObj.phoneNumbers.split(',');
        var obj = {
            id: currentObj.id,
            firstName: currentObj.firstName,
            lastName: currentObj.lastName,
            phones: phoneNumbers,
        };
        var contact = this.addContact(obj);
    }

    /**
     * Generate next ID
     * @returns {number}
     */
    Phonebook.prototype.generateNextId = function () {
        return this.nextID++;
    }

    /**
     * Add group
     * @param name
     */
    Phonebook.prototype.addGroup = function (obj) {
        var group = new myPhonebook.Group(obj.name, this.generateNextId());
        this.addItem(this.currentGroup, group);

        dispatcher.emit('UPDATE_LOCAL_STORAGE', this.root);
        dispatcher.emit('UPDATE_DOM', this.currentGroup);

        return group;
    }

    /**
     * Update group
     * @param obj
     */
    Phonebook.prototype.updateGroup = function (obj) {
        var group = new myPhonebook.Group(obj.name, obj.id);

        this.updateItem(this.currentGroup, group);

        dispatcher.emit('UPDATE_LOCAL_STORAGE', this.root);
        dispatcher.emit('UPDATE_DOM', this.currentGroup);
    }

    /**
     * Add contact
     * @param firstName
     * @param lastName
     * @param phoneNumbers
     */
    Phonebook.prototype.addContact = function (obj) {
        var contact = new myPhonebook.Contact(obj.firstName, obj.lastName, obj.phones, this.generateNextId());
        this.addItem(this.currentGroup, contact);

        dispatcher.emit('UPDATE_LOCAL_STORAGE', this.root);
        dispatcher.emit('UPDATE_DOM', this.currentGroup);
    }


    /**
     * Update contact
     * @param obj
     */
    Phonebook.prototype.updateContact = function (obj) {
        var contact = new myPhonebook.Contact(obj.firstName, obj.lastName, obj.phones, obj.id);
        this.updateItem(this.currentGroup, contact);

        dispatcher.emit('UPDATE_LOCAL_STORAGE', this.root);
        dispatcher.emit('UPDATE_DOM', this.currentGroup);
    }

    /**
     * Deletes contact or group
     * @param obj
     */
    Phonebook.prototype.delete = function (obj) {
        var self = this;
        this.currentGroup.items.forEach(function (item, index) {
            if (item.id == obj.id) {
                self.currentGroup.items.splice(index, 1);
                self.currentGroup.childrenCount--;
            }
        });

        dispatcher.emit('UPDATE_LOCAL_STORAGE', this.root);
        dispatcher.emit('UPDATE_DOM', this.currentGroup);
    }

    /**
     * Search contact or group
     * @param obj
     */
    Phonebook.prototype.search = function (obj) {
        var arr = []
        this.searchByText(this.root, obj.text.toUpperCase(), arr);

        dispatcher.emit('UPDATE_DOM_WITH_FOUNDED', arr);
    }

    /**
     * Run search on phonebook
     * @param cGroup
     * @param textSearch
     */
    Phonebook.prototype.searchByText = function (cGroup, textSearch, arr) {
        var self = this;
        cGroup.items.forEach(function (item, index) {
            switch (item.type) {
                case "CONTACT":
                    if (item.firstName.toUpperCase() == textSearch ||
                        item.lastName.toUpperCase() == textSearch ||
                        (item.phoneNumbers.indexOf(textSearch) > -1)) {
                        arr.push(item);
                    }
                    break;
                case "GROUP":
                    if (item.name.toUpperCase() == textSearch) {
                        arr.push(item);
                    }
                    else {
                        self.searchByText(item, textSearch, arr);
                    }
                    break;
            }
        });
    }

    /**
     * Add item tp current group
     * @param obj
     * @param item
     */
    Phonebook.prototype.addItem = function (obj, item) {
        obj.items.push(item);
        obj.childrenCount = +obj.childrenCount + 1;
        item.parent = obj;
    }

    /**
     * Add item tp current group
     * @param obj
     * @param item
     */
    Phonebook.prototype.updateItem = function (obj, item) {
        for (var i = 0; i < obj.items.length; i++) {
            if (obj.items[i].id == item.id) {
                obj.items[i] = item;
                break;
            }
        }
    }

    /**
     * Update current group
     * @param cGroup
     * @param groupID
     */
    Phonebook.prototype.changeCurrentGroup = function (cGroup, groupID) {
        cGroup.items.forEach(function (item) {
            if (item.id == groupID) {
                this.currentGroup = item;
                return;
            }
            else if (item.type == 'Group') {
                this.changeCurrentGroup(item, groupID)
            }
        });
    }

    /**
     * Change current group
     * @param group
     */
    Phonebook.prototype.changeCurrentGroupByClick = function (group) {
        this.currentGroup = group;
        console.log(this.currentGroup.name);
    }

    /**
     * Get phone numbers
     * @param phoneNumbers
     * @returns {Array}
     */
    Phonebook.prototype.getPhoneNumbers = function (phoneNumbers) {
        var phones = [];
        for (var i = 0; i < phoneNumbers.length; i++) {
            phones[i] = phoneNumbers[i].value;
        }

        return phones
    }

    /**
     * Get contact list by group
     * @param groupID
     */
    Phonebook.prototype.getContactsList = function (groupID) {
        this.showContactsList(groupID);

        if (groupID == -1) {
            this.currentGroup = this.root;
        }
        else {
            this.changeCurrentGroup(this.root, groupID)
        }
    }

    return Phonebook;
})();