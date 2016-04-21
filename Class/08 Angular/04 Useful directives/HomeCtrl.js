var app = angular.module("myApp", []);

(function() {
    function HomeCtrl() {
        this.counter = 0;

        this.contacts = [
            {id:1, name: "Ori", email:"ori@gmail.com"},
            {id:2, name: "Roni", email:"roni@gmail.com"},
        ];

        this.url = "http://www.google.com";
        this.imageUrl = "desert.jpg";

        this.isLarge = false;
    }

    HomeCtrl.prototype.toggleAdmin = function() {
        this.isAdmin = !this.isAdmin;
    }

    HomeCtrl.prototype.toggleLarge = function() {
        this.isLarge = !this.isLarge;
    }

    HomeCtrl.prototype.inc = function () {
        console.log("inc");

        ++this.counter;
    }

    HomeCtrl.prototype.remove = function(contact, index) {
        if(confirm("Do you want to delete contact " + contact.name + " ?")) {
            this.contacts.splice(index, 1);
        }
    }

    HomeCtrl.prototype.sayHello = function() {
        alert("Hello " + this.name);
    }

    HomeCtrl.prototype.reset = function() {
        this.name = "";
    }

    app.controller("HomeCtrl", HomeCtrl);
})();
