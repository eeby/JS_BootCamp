var contactBook = contactBook || {};

contactBook.storage = (function(network){
    var contacts = null;

    function getAllContacts(){
        network.httpGet("/api/contacts");
    }

    return {
        getAllContacts: getAllContacts,
    };
})(contactBook.network);
