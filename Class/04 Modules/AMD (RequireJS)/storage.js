define(["./network"], function (network) {
    function getAllContacts() {
        network.httpGet("/api/contact");
    }

    return {
        getAllContacts: getAllContacts,
    };
});