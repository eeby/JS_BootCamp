"use strict";
var module_1 = require("../common/module");
var ContactListComponent = (function () {
    function ContactListComponent() {
    }
    ContactListComponent.prototype.reverse = function () {
        //this.contacts.reverse();
        this.onReverse();
    };
    return ContactListComponent;
}());
module_1.module.component("contactList", {
    template: require("./contactList.html!text"),
    styles: require("./contactList.css!css"),
    controller: ContactListComponent,
    bindings: {
        contacts: "<",
        onReverse: "&",
    }
});
//# sourceMappingURL=contactList.js.map