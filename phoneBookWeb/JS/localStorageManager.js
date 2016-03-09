"use strict"

define([], function () {

    var objString;
    var readFileIndex = 0;
    var nextId = 0;

    // return the ContactsManager
    return {
        setLocalStorage: setLocalStorage,
        getLocalStorage: getLocalStorage,
        nextId: nextId,
    };

    function setLocalStorage() {
        objString = '{"nextId": "' + nextId + '"}';
        convertObjectToString(root);
        localStorage.setItem(LOCAL_STORAGE, objString);
    }

    function convertObjectToString(currentGroup) {
        convertGroupToString(currentGroup);
        currentGroup.items.forEach(function (item) {
            if (item.type == "Contact") {
                convertContactToString(item);
            }
        });

        currentGroup.items.forEach(function (item) {
            if (item.type == "Group") {
                convertObjectToString(item);
            }
        });
    }

    function convertGroupToString(item) {
        objString += '|{';
        objString += '"type": "' + item.type + '",';
        objString += '"id": "' + item.id + '",';
        objString += '"name": "' + item.name + '",';
        objString += '"items": "' + item.childrenCount + '"';
        objString += '}';
    }

    function convertContactToString(item) {
        objString += '|{';
        objString += '"type": "' + item.type + '",';
        objString += '"id": "' + item.id + '",';
        objString += '"firstName": "' + item.firstName + '",';
        objString += '"lastName": "' + item.lastName + '",';
        objString += '"phoneNumbers": "' + item.phoneNumbers + '"';
        objString += '}';
    }

    function getLocalStorage() {
        var dataArr = localStorage.getItem(LOCAL_STORAGE).split('|');
        console.log(dataArr);
        var obj = JSON.parse(dataArr[readFileIndex]);

        nextId = obj.nextId;
        readFileIndex++;

        // root object
        obj = JSON.parse(dataArr[readFileIndex]);
        readFileIndex++;
        updateRoot(obj.items);

        for (var i = 0; i < root.childrenCount; i++) {
            obj = JSON.parse(dataArr[readFileIndex]);
            readFileIndex++;
            addGroupsAndContactsToPhoneBook(obj, dataArr);
        }

        currentGroup = root;
    }

    function addGroupsAndContactsToPhoneBook(currentObj, dataArr) {
        if (currentObj.type == 'Group') {
            var group = pushGroup(currentObj.id, currentObj.name, currentObj.items);
            pushItem(group);
            currentGroup = group;

            for (var i = 0; i < currentGroup.childrenCount; i++) {
                var obj = JSON.parse(dataArr[readFileIndex]);
                readFileIndex++;
                addGroupsAndContactsToPhoneBook(obj, dataArr);
            }
            currentGroup = currentGroup.parent;
        }
        else {
            addContactToPhoneBook(currentObj);
        }
    }
});