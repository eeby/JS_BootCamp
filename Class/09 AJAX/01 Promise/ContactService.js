var contactService = (function() {

    //var baseUrl = $("base").attr("href");

    function buildIndex(contacts) {
        var index = {};

        contacts.forEach(function (contact) {
            index[contact.id] = contact;
        });

        return index;
    }

    function getAllContacts() {
        var promise = Q($.ajax({
            type: "GET",
            //url: baseUrl + "contacts.json",
            url: "contacts.json",
        })).then(function(contacts) {
            var index = buildIndex(contacts);
            console.log(index);
            contacts.forEach(function (contact) {
                contact.parent = index[contact.parentId] || null;
                console.log(contact);
            });

            return contacts;
        });
        
        return promise;
    }

    return {
        getAllContacts: getAllContacts,
    };
    
})();
