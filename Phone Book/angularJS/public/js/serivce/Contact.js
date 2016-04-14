(function () {
    "use strict"

    function ContactService() {


        /**
         * Create new contact
         * @param firstName
         * @param lastName
         * @param phoneNumbers
         * @serivce
         */
        this.Contact = function(firstName, lastName, phoneNumbers, nextID) {
            this.id = nextID;
            this.type = 'CONTACT';
            this.firstName = firstName;
            this.lastName = lastName;
            this.phoneNumbers = phoneNumbers;
        }
    }

    angular.module("app")
        .service("contactService", ContactService);
})();


