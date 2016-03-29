"use strict"

var dispatcher = new Dispatcher();
var myPhonebook = myPhonebook || {};

window.onload = function () {
    myPhonebook.app = (function () {

        var localstorage = new myPhonebook.Localstorage();
        var phonebookArr = localstorage.getLocalStorage();

        var phonebook = new myPhonebook.Phonebook();
        var resRoot = phonebook.LoadPhonebook(phonebookArr);

        var groupExplorer = new myPhonebook.GroupExplorerView(domHelpers.getElement("#directoryTree"));
        groupExplorer.bind(resRoot);

        var menuView = new myPhonebook.MenuView(domHelpers.getElement("nav"));

        var addContact = new myPhonebook.AddContactView(domHelpers.getElement("#addContact"));

        var addGroup = new myPhonebook.AddGroupView(domHelpers.getElement("#addGroup"));

        var promptView = new myPhonebook.PromptView(domHelpers.getElement("#myModal"));

        return {
            dispatcher: dispatcher,
        }

    })();
}
