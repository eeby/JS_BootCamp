var contactService = (function() {

    var cache = {};
    var stack = [];

    function cacheFind(key) {
        var res = cache[key];
        return res;
    }

    function cacheInsert(key, value) {
        if(cache[key]) {
            return;
        }

        cache[key] = value;
        stack.push(key);

        if(stack.length > 5) {
            var oldKey = stack.shift();
            delete cache[oldKey];
        }
    }

    function intrenalGetContactById(contacts, id) {
        for(var i=0; i<contacts.length; i++) {
            if(contacts[i].id == id) {
                return contacts[i];
            }
        }

        throw new Error("Cannot find contact with id: " + id);
    }

    function getContactById(id) {
        var promise = cacheFind(id);
        if(promise) {
            return promise;
        }

        promise = Q($.ajax({
            type: "GET",
            url: "contacts.json",
        }).then(function(contacts) {
            var contact = intrenalGetContactById(contacts, id);

            return contact;
        }));

        cacheInsert(id, promise);

        return promise;
    }
    
    return {
        getContactById: getContactById,
    };
    
})();
