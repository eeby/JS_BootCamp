"use strict"

var phonebook = phonebook || {};

phonebook.groupsManager = (function () {

    // return the ContactsManager
    return {
        addGroup: addGroup,
        deleteGroup: deleteGroup,
        getAllGroups: getAllGroups,
    };

    var groupsList = [];

    function findContact() {

    }

    function addGroup(name, groupID) {
        groupsList.push(
            {
                ID: generateID(),
                parentID: groupID,
                name: name
            }
        );
    }

    function deleteGroup(groupID) {
        // delete persons under  the current group
        deleteContactByGroupID(groupID);

        // delete groups under current group
        for (var i = 0; i < groupsList.length; i++) {
            if (groupsList[i].parentID == groupID) {
                // delete persons under  the current group
                deleteContactByGroupID(groupID);

                groupsList.splice(i, 1);
                i--;
            }
        }

        // delete current group
        for (var i = 0; i < groupsList.length; i++) {
            if (groupsList[i].ID == groupID) {
                groups.splice(i, 1);
                break;
            }
        }
    }

    function getAllGroups() {
        console.log('getting all contacts');
    }

})();