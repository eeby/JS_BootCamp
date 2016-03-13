//"use strict"

var phonebook = phonebook || {};

(function () {

    document.getElementById('btnCreateGroup').addEventListener("click", function () {
        var groupName = document.getElementById('textGroupName');

        if (groupName.value == '') {
            alert('Please fill all fields!');
            return;
        }
        phonebook.app.addGroup(groupName.value);

        groupName.value = '';
    });

    document.getElementById('btnCreateContact').addEventListener("click", function () {
        var isOk = false;
        var firstName = document.getElementById('textFirstName');
        var lastName = document.getElementById('textLastName');
        var phones = document.getElementsByName('textPhone');

        phones = phonebook.app.getPhoneNumbers(phones);

        if (firstName.value == '' || lastName.value == '' || phones[0] == '') {
            alert('Please fill all fields!');
            return;
        }
        phonebook.app.addContact(firstName.value, lastName.value, phones);

        firstName.value = '';
        lastName.value = '';
        document.getElementById('phonesWrp').innerHTML = '<input type="text" name="textPhone" class="inputText">';
    });

    document.getElementById('btnAddPhones').addEventListener("click", function () {
        var phonesWrp = document.getElementById('phonesWrp');
        var input = document.createElement("input");
        input.type = 'text';
        input.name = 'textPhone';
        input.className = 'inputText';
        input.setAttribute('placeholder', 'Enter phone');
        phonesWrp.appendChild(input);
    });

    document.getElementById('btnSearch').addEventListener("click", function () {
        var search = document.getElementById('textSearch');

        if (search.value != '') {
            phonebook.app.findElem(search.value.trim());
        }
        else {
            alert('Please enter search criteria!');
        }
        search.value = '';
    });
})();




