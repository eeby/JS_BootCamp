var app = angular.module("myRout", []);

(function() {

    ContactsCtrl.prototype.remove = function(contact, index) {
        if(confirm("Do you want to delete contact " + contact.name + " ?")) {
            this.contacts.splice(index, 1);
        }
    }

    ContactsCtrl.prototype.add = function() {
        this.counter++;
        this.contacts.push({id:this.counter, name: this.name});
        this.reset();
    }

    ContactsCtrl.prototype.up = function(contact, index) {
        if(index > 0){
            var tmpContact = this.contacts[index-1];
            this.contacts[index-1] = contact;
            this.contacts[index] = tmpContact;
        }
    }

    ContactsCtrl.prototype.down = function(contact, index) {
        if(index + 1 < this.contacts.length){
            var tmpContact = this.contacts[index+1];
            this.contacts[index+1] = contact;
            this.contacts[index] = tmpContact;
        }
    }


    ContactsCtrl.prototype.reset = function() {
        this.name = '';
    }

    app.controller("HomeCtrl", HomeCtrl);
})();
