var ContactList = (function() {

    function ContactList(element) {
        View.call(this, element);

        this.contacts = null;
        this.ul = this.getChildElement("ul");

        //
        //  A string which contains the template for all
        //  contact items inside the ul
        //
        this.contactTemplate = null;

        this.loadTemplate();
    }

    ContactList.prototype = Object.create(View.prototype);

    ContactList.prototype.loadTemplate = function() {
        var templateElement = this.getChildElement("ul li");
        templateElement.remove();

        this.contactTemplate = templateElement.outerHtml();
    }

    ContactList.prototype.bind = function(contacts) {
        this.contacts = contacts;

        this.updateDOM();
    }

    ContactList.prototype.updateDOM = function() {
        var me = this;

        this.ul.empty();

        me.contacts.forEach(function(contact, index) {

            var li = $(me.contactTemplate);
            li.find(".name").text(contact.name);
            li.find(".email").text(contact.email);
            li.find("button").click(me.onButtonDeleteClicked.bind(me, contact, index, li));

            me.ul.append(li);
        });
    }

    ContactList.prototype.onButtonDeleteClicked = function(contact, index, li) {
        this.contacts.splice(index, 1);

        li.remove();

        //this.updateDOM();
    }

    return ContactList;
})();
