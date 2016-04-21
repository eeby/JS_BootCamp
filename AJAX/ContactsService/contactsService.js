contactsService = (function () {

    function itemsCount(obj) {
        var size = 0, key;
        var isFirst = true;
        var firstElem;
        for (key in obj) {
            if (isFirst) {
                firstElem = key;
                isFirst = false;
            }
            if (obj.hasOwnProperty(key)) size++;
        }
        return {size: size, first: firstElem};
    }

    function getContactByID(id) {
        if (!arr[id]) {
            var promise = Q($.ajax({
                type: "GET",
                url: "contacts.json",
                data: {id: id}
            })).then(function (contacts) {
                    var objRes = itemsCount(arr);

                    if(objRes.size == 5){
                        delete arr[objRes.first];
                    }
                    contacts.forEach(function (contact) {
                        if (contact.id == id) {
                            arr[contact.id] = contact.name;
                        }
                    });
                })
                .catch(function (err) {
                    console.log("Error: " + err);
                });

            return promise;
        }
        else {
            return Q.when(arr[id]);
        }
    }

    return {
        getContactByID: getContactByID,
    }
})();