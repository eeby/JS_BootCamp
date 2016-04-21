$("button").click(function () {
    contactService.getAllContacts().then(function (contacts) {
        
        contacts.forEach(function (contact) {
            console.log(contact.name);

            if(contact.parent) {
                console.log("  PARENT: " + contact.parent.name);
            }
        });

    }).catch(function (err) {
        console.log("ERROR: " + err);
    });
});
