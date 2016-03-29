"use strict"

var myPhonebook = myPhonebook || {};

myPhonebook.Contact = (function () {
    "use strict"

    /**
     * Create new contact
     * @param firstName
     * @param lastName
     * @param phoneNumbers
     * @constructor
     */
    function Contact(firstName, lastName, phoneNumbers, nextID) {
        this.id = nextID;
        this.type = 'CONTACT';
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumbers = phoneNumbers;
    }

    return Contact;
})();


