$("button").click(function () {
    for(var i=0; i<7; i++) {
        var id = (i % 6) + 1;
        console.log("ID: " + id);
        contactService.getContactById(id).then(function (contact) {
            console.log(contact);
        }).catch(function (err) {
            console.log("ERROR: " + err);
        });
    }
});
