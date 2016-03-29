"use strict"

var myPhonebook = myPhonebook || {};

myPhonebook.AddContactView = (function () {

    /**
     *
     * @param element
     * @constructor
     */
    function AddContactView(element) {
        if (dispatcher) {
            dispatcher.on('ADD_NEW_CONTACT', this, this.emptyElements);
            dispatcher.on('UPDATE_DOM_CONTACT', this, this.updateElements);
        }

        myPhonebook.View.call(this, element);

        this.id = null;
        this.firstName = null;
        this.lastName = null;
        this.phones = null;

        this.getChildElement("#btnCreateContact").click(this.createContact.bind(this));
        this.getChildElement("#btnUpdateContact").click(this.updateContact.bind(this));
        this.getChildElement("#btnDeleteContact").click(this.deleteContact.bind(this));
        this.getChildElement("#btnCancelContact").click(this.cancelContact.bind(this));
        this.getChildElement("#btnAddPhones").click(this.appendInputPhone.bind(this));
    }

    AddContactView.prototype = Object.create(myPhonebook.View.prototype);

    /**
     * Update DOM
     */
    AddContactView.prototype.updateDOM = function () {
        $("div[name=panelWrp]").addClass("hide");
        $("#addContact").removeClass("hide");
    }

    /**
     * Go back to group explorer
     */
    AddContactView.prototype.cancelContact = function () {
        dispatcher.emit('CANCEL', {});
    }

    /**
     * Create contact
     */
    AddContactView.prototype.createContact = function () {
        this.firstName = $("#textFirstName").val();
        this.lastName = $("#textLastName").val();
        this.phones = this.getPhoneNumbers($('[name=textPhone]'));

        if (this.firstName == '' || this.lastName == '' || this.phones[0] == '') {
            var obj = {
                message: 'Please fill all fields!',
            };

            dispatcher.emit('ALERT', obj);
            return;
        }

        var obj = {
            firstName: this.firstName,
            lastName: this.lastName,
            phones: this.phones,
        };

        dispatcher.emit('CREATE_CONTACT', obj);

        $("#textFirstName").val('');
        $("#textLastName").val('');
        $("#textFirstName").val('');
        $("#phonesWrp").html('<input type="text" name="textPhone" placeholder="Enter phone" class="inputText">');
    }

    /**
     * Update contact
     */
    AddContactView.prototype.updateContact = function () {
        this.id = $("#hidID").val();
        this.firstName = $("#textFirstName").val();
        this.lastName = $("#textLastName").val();
        this.phones = this.getPhoneNumbers($('[name=textPhone]'));

        if (this.firstName == '' || this.lastName == '' || this.phones[0] == '') {
            alert('Please fill all fields!');
            return;
        }

        var obj = {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            phones: this.phones,
        };

        dispatcher.emit('UPDATE_CONTACT', obj);
    }

    /**
     * Delete contact
     */
    AddContactView.prototype.deleteContact = function () {
        this.id = $("#hidID").val();
        this.firstName = $("#textFirstName").val();
        this.lastName = $("#textLastName").val();
        this.phones = this.getPhoneNumbers($('[name=textPhone]'));

        var obj = {
            id: this.id,
            message: 'Do you want to delete Contact: "' + this.firstName + ' ' + this.lastName + '" ?',
            emit: 'DELETE',
        };

        dispatcher.emit('PROMPT', obj);
    }

    /**
     * Get phone numbers
     * @param phoneNumbers
     * @returns {Array}
     */
    AddContactView.prototype.getPhoneNumbers = function (phoneNumbers) {
        var phones = [];
        for (var i = 0; i < phoneNumbers.length; i++) {
            phones[i] = phoneNumbers[i].value;
        }

        return phones;
    }

    /**
     * Update contact
     * @param item
     */
    AddContactView.prototype.updateElements = function (item) {
        var self = this;

        $("#btnUpdateContact").removeClass('hide');
        $("#btnDeleteContact").removeClass('hide');
        $("#btnCreateContact").addClass('hide');

        $("#hidID").val(item.id);
        $("#textFirstName").val(item.firstName);
        $("#textLastName").val(item.lastName);
        $("#phonesWrp").html('');

        item.phoneNumbers.forEach(function (phone) {
            self.appendInputPhone();
            $("input[name=textPhone]:last").val(phone);
        });

        this.updateDOM();
    }

    /**
     * Reset DOM elements
     */
    AddContactView.prototype.emptyElements = function () {
        $("#btnCreateContact").removeClass('hide');
        $("#btnUpdateContact").addClass('hide');
        $("#btnDeleteContact").addClass('hide');

        $("#hidID").val('');
        $("#textFirstName").val('');
        $("#textLastName").val('');
        $("#phonesWrp").html('<input type="text" name="textPhone" placeholder="Enter phone" class="inputText">');

        this.updateDOM();
    }

    /**
     * Add phone input
     */
    AddContactView.prototype.appendInputPhone = function () {
        var phonesWrp = $('#phonesWrp');
        var input = $("<input />");
        input.attr("type", 'text');
        input.attr("name", 'textPhone');
        input.addClass('inputText');
        input.attr('placeholder', 'Enter phone');
        phonesWrp.append(input);
    }

    return AddContactView;
})();
