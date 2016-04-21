var arr = {};

var contacts = (function () {


    var promise = contactsService.getContactByID('1');

    promise = contactsService.getContactByID('2');

    promise = contactsService.getContactByID('3');

    promise = contactsService.getContactByID('4');

    promise = contactsService.getContactByID('5');

    promise = contactsService.getContactByID('6');



    return {
        arr: arr,
    }
})();
    