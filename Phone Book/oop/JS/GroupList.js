
var phonebook = phonebook || {};

phonebook.groupList = (function () {
    "use strict"
/**
 * Update selected group in view
 * @param groupID
 */
function updateSelectedGroup(groupID) {
    if (document.querySelector('li.selected')) {
        document.querySelector('li.selected').className = '';
    }

    document.getElementById(groupID).className = 'selected';
}
