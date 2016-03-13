var phonebook = phonebook || {};

phonebook.inherit = (function (derived, base) {
    "use strict"

    function Dummy() {
        Dummy.prototype = base.prototype;
        derived.prototype = new Dummy();
    }

})();
