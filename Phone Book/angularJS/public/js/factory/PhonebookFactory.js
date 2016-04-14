(function () {
    "use strict"

    function PhonebookFactory($http, contactService, groupService, dataService) {
        var arrIndex = 0;
        var nextID = 1;
        var readyToUpdate = false;
        var group = null;
        var currentGroup = null;
        var root = null;

        var createNewPhoneBook = function () {
            return currentGroup = root = new groupService.Group('Phonebook', -1);
        }

        var getRoot = function () {

            if (dataService.root.length > 0) {
                var jsonArr = dataService.root;
                var obj = jsonArr[arrIndex];
                arrIndex++;

                currentGroup = root = new groupService.Group(obj.name, obj.id);

                var rootItems = obj.items;
                for (var i = 0; i < rootItems; i++) {
                    obj = jsonArr[arrIndex];
                    arrIndex++;

                    addGroupsAndContactsToPhoneBook(obj, jsonArr);
                    currentGroup = root;
                }

                currentGroup = root;



            }
            else {
                createNewPhoneBook();
            }

            readyToUpdate = true;
            return root;
        }

        /**
         * Add contacts and groups from local storage
         * @param currentObj
         * @param dataArr
         */
        var addGroupsAndContactsToPhoneBook = function (currentObj, dataArr) {
            if (currentObj.type.toUpperCase() == 'GROUP') {
                var group = addGroup(currentObj);

                currentGroup = group;
                var currItems = currentObj.items;
                for (var i = 0; i < currItems; i++) {
                    var obj = dataArr[arrIndex];
                    arrIndex++;

                    addGroupsAndContactsToPhoneBook(obj, dataArr);
                }

                currentGroup = currentGroup.parent;
            }
            else {
                addContactToPhoneBook(currentObj);
            }
        }

        /**
         * Add group
         * @param obj
         */
        var addGroup = function (obj) {
            var group = new groupService.Group(obj.name, generateNextId());
            addItem(currentGroup, group);

            if (readyToUpdate) {
                dataService.WriteIOFile(root);
            }

            return group;
        }

        var addGroupFounded = function () {
            var group = new groupService.Group('Founded', -2);
            return group;
        }

        /**
         * Add contact from local storage
         * @param currentObj
         */
        var addContactToPhoneBook = function (currentObj) {
            var phoneNumbers = currentObj.phoneNumbers.split(',');
            var obj = {
                id: currentObj.id,
                firstName: currentObj.firstName,
                lastName: currentObj.lastName,
                phones: phoneNumbers,
            };
            var contact = addContact(obj);
        }

        /**
         * Add contact
         * @param firstName
         * @param lastName
         * @param phoneNumbers
         */
        var addContact = function (obj) {
            var contact = new contactService.Contact(obj.firstName, obj.lastName, obj.phones, generateNextId());
            addItem(currentGroup, contact);

            if (readyToUpdate) {
                dataService.WriteIOFile(root);
            }

        }

        /**
         * Update contact
         * @param obj
         */
        var updateContact = function (obj) {
            var contact = new contactService.Contact(obj.firstName, obj.lastName, obj.phones, obj.id);
            updateItem(currentGroup, contact);

            if (readyToUpdate) {
                dataService.WriteIOFile(root);
            }

        }


        /**
         * Add item tp current group
         * @param obj
         * @param item
         */
        var addItem = function (obj, item) {
            obj.items.push(item);
            obj.childrenCount = +obj.childrenCount + 1;
            item.parent = obj;
        }


        var updateGroup = function (name, id) {
            var group = new groupService.Group(name, id);
            group.parent = currentGroup;

            updateItem(currentGroup, group);

            if (readyToUpdate) {
                dataService.WriteIOFile(root);
            }

        }

        /**
         * Add item tp current group
         * @param obj
         * @param item
         */
        var updateItem = function (obj, item) {

            for (var i = 0; i < obj.items.length; i++) {
                if (obj.items[i].id == item.id) {
                    obj.items[i] = item;
                    break;
                }
            }
        }

        var updateCurrentGroup = function (cGroup) {
            currentGroup = cGroup;
            return currentGroup;
        }

        var remove = function (obj, id) {
            for (var i = 0; i < obj.items.length; i++) {
                if (obj.items[i].id == id) {
                    obj.items.splice(i, 1);
                    obj.childrenCount--;
                    break;
                }
            }

            if (readyToUpdate) {
                dataService.WriteIOFile(root);
            }
        }

        /**
         * Run search on phonebook
         * @param cGroup
         * @param textSearch
         */
        var searchByText = function (cGroup, textSearch, group) {
            var self = this;

            cGroup.items.forEach(function (item, index) {
                switch (item.type) {
                    case "CONTACT":
                        if (item.firstName.toUpperCase() == textSearch.toUpperCase() ||
                            item.lastName.toUpperCase() == textSearch.toUpperCase() ||
                            (item.phoneNumbers.indexOf(textSearch) > -1)) {
                            group.items.push(item);
                        }
                        break;
                    case "GROUP":
                        if (item.name.toUpperCase() == textSearch.toUpperCase()) {
                            group.items.push(item);
                        }
                        else {
                            self.searchByText(item, textSearch, group);
                        }
                        break;
                }
            });

            return group;
        }

        /**
         * Generate next ID
         * @returns {number}
         */
        var generateNextId = function () {
            return nextID++;
        }

        return {
            getRoot: getRoot,
            updateCurrentGroup: updateCurrentGroup,
            remove: remove,
            addGroup: addGroup,
            updateGroup: updateGroup,
            addContact: addContact,
            updateContact: updateContact,
            searchByText: searchByText,
            addGroupFounded: addGroupFounded,
            createNewPhoneBook: createNewPhoneBook,
        }
    }

    angular.module("app")
        .factory("phonebookFactory", PhonebookFactory);

})();
