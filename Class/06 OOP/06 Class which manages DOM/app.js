(function() {

    var contacts = [
        {id:1, name: "Ori", email: "ori@gmail.com"},
        {id:2, name: "Roni", email: "roni@gmail.com"},
    ];

    var contactList = new ContactList(domHelpers.getElement(".contact-list"));
    contactList.bind(contacts);

    var menu = new Menu(domHelpers.getElement(".menu"));
})();
