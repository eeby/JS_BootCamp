(function () {
    "use strict"

    function PhonebookCtrl($scope, phonebookFactory) {
        var self = this;
        this.phonebookFactory = phonebookFactory;
        //this.promptFactory = promptFactory;

        this.showModel = false;
        this.itemToDelete = null;
        this.panel = 0;
        this.updateMode = false;
        this.root = this.currentGroup = null;
        this.foundedGroup = null;

        $scope.$on('showCurrentGroup', function () {
            self.root = self.currentGroup = self.phonebookFactory.getRoot();
        });

        $scope.$on('newPhoneBook', function () {
            self.root = self.currentGroup = self.phonebookFactory.createNewPhoneBook();
        });
    }

    PhonebookCtrl.prototype.editGroupClicked = function (item, index) {
        event.stopPropagation();
        this.setPanel(2);
        this.updateMode = true;
        this.name = item.name;
        this.groupId = item.id;
    }

    PhonebookCtrl.prototype.toggleModal = function(){
        this.showModal = !this.showModal;
    }

    /**
     * Confirmed button clicked
     */
    PhonebookCtrl.prototype.confirmClicked = function () {
        this.phonebookFactory.remove(this.currentGroup, this.itemToDelete.id);
        $("#myModal").modal('toggle');
        this.goHome();
    }

    PhonebookCtrl.prototype.deleteGroupClicked = function (item, index) {
        event.stopPropagation();

        var objMessage = {
            type: 'Delete',
            message: 'Do you want to delete group: "' + item.name + '" ?',
        };

        this.itemToDelete = item;
        this.showAlert(objMessage);

    }

    PhonebookCtrl.prototype.showAlert = function(objMessage){
        this.showModel = true;
        $("#myModal").find('.modal-body').html(objMessage.message);
        $("#myModal").modal();
    }

    PhonebookCtrl.prototype.deleteContactClicked = function () {
        var objMessage = {
            type: 'Delete',
            message: 'Do you want to delete contact: "' + this.contact.firstName + ' ' + this.contact.lastName + '" ?',
        };

        this.itemToDelete = this.contact;
        this.showAlert(objMessage);

    }


    /**
     * Search items
     */
    PhonebookCtrl.prototype.searchClicked = function () {
        event.preventDefault();
        this.setPanel(3);
        var group = this.phonebookFactory.addGroupFounded();
        this.foundedGroup = this.phonebookFactory.searchByText(this.root, this.search, group);
        this.search = '';
    }



    PhonebookCtrl.prototype.isPanelSet = function (checkPanel) {
        return this.panel == checkPanel;
    };

    PhonebookCtrl.prototype.setPanel = function (activePanel) {
        this.panel = activePanel;
    };

    PhonebookCtrl.prototype.itemClicked = function (item, index) {
        var self = this;
        this.updateMode = true;
        switch (item.type) {
            case "GROUP":
                this.currentGroup = this.phonebookFactory.updateCurrentGroup(item);
                this.goHome();
                break;
            case "CONTACT":
                this.setPanel(1);
                $('input.append').remove();

                this.firstName = item.firstName;
                this.lastName = item.lastName;
                this.contact = item;
                this.phone = item.phoneNumbers;

                item.phoneNumbers.forEach(function (phone, index) {
                    console.log(index);
                    if (index == 0) {
                        self.phone = phone;
                    }
                    else {
                        self.appendInputPhone();
                        $("input[name=textPhone]:last").val(phone);
                    }
                });

                this.contactId = item.id;
                break;
        }
    }


    /**
     * Add group
     * @param obj
     */
    PhonebookCtrl.prototype.addGroupClicked = function () {
        if(this.name == '' || this.name == undefined) {
            return;
        }

        this.phonebookFactory.addGroup({name: this.name});

        this.goHome();
    }

    /**
     * Update group
     * @param obj
     */
    PhonebookCtrl.prototype.updateGroupClicked = function () {
        if(this.name == '' || this.name == undefined) {
            return;
        }

        this.phonebookFactory.updateGroup(this.name, this.groupId);

        this.goHome();
    }

    /**
     * Add contact
     * @param obj
     */
    PhonebookCtrl.prototype.addContactClicked = function () {
        if(this.firstName == '' || this.firstName == undefined || this.lastName == '' || this.lastName == undefined
            || this.phone == '' || this.phone == undefined) {
            return;
        }

        var phones = this.getPhoneNumbers($('[name=textPhone]'));
        this.phonebookFactory.addContact({
            firstName: this.firstName,
            lastName: this.lastName,
            phones: phones,
        });

        this.goHome();
    }

    /**
     * Update contact
     * @param obj
     */
    PhonebookCtrl.prototype.updateContactClicked = function () {
        if(this.firstName == '' || this.firstName == undefined || this.lastName == '' || this.lastName == undefined
            || this.phone == '' || this.phone == undefined) {
            return;
        }

        var phones = this.getPhoneNumbers($('[name=textPhone]'));
        this.phonebookFactory.updateContact({
            firstName: this.firstName,
            lastName: this.lastName,
            phones: phones,
            id: this.contactId,
        });

        this.goHome();
    }

    PhonebookCtrl.prototype.addItemClicked = function (val) {
        this.updateMode = false;
        $('input.append').remove();
        $('input[type=text]').val('');
        this.setPanel(val);
    }

    PhonebookCtrl.prototype.goHome = function () {
        this.setPanel(0);
    }

    PhonebookCtrl.prototype.goToParent = function () {
        this.currentGroup = this.phonebookFactory.updateCurrentGroup(this.currentGroup.parent);
    }

    /**
     * Get phone numbers
     * @param phoneNumbers
     * @returns {Array}
     */
    PhonebookCtrl.prototype.getPhoneNumbers = function (phoneNumbers) {
        var phones = [];
        for (var i = 0; i < phoneNumbers.length; i++) {
            phones[i] = phoneNumbers[i].value;
        }

        return phones;
    }

    /**
     * Add phone input
     */
    PhonebookCtrl.prototype.appendInputPhone = function () {
        var phonesWrp = $('#phonesWrp');
        var input = $("<input />");
        input.attr("type", 'text');
        input.attr("name", 'textPhone');
        input.addClass('inputText  append');
        input.attr('placeholder', 'Enter phone');
        phonesWrp.append(input);
    }


    angular.module("app")
        .controller("PhonebookCtrl", PhonebookCtrl);

})();
