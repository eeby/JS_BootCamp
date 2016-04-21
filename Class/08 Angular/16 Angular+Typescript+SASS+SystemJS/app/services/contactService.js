"use strict";
var module_1 = require("../common/module");
var ContactService = (function () {
    function ContactService($q) {
        this.$q = $q;
    }
    ContactService.prototype.getAll = function () {
        return this.$q.when([
            { id: 1, name: "Ori" },
            { id: 2, name: "Roni" },
        ]);
    };
    return ContactService;
}());
exports.ContactService = ContactService;
module_1.module.service("contactService", ContactService);
//# sourceMappingURL=contactService.js.map