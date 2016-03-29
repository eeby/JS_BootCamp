"use strict"

var myPhonebook = myPhonebook || {};

myPhonebook.AddGroupView = (function () {

    /**
     *
     * @param element
     * @constructor
     */
    function AddGroupView(element) {
        if (dispatcher) {
            dispatcher.on('ADD_NEW_GROUP', this, this.emptyElements);
            dispatcher.on('UPDATE_DOM_GROUP', this, this.updateElements);
            dispatcher.on('DELETE_THE_GROUP', this, this.deleteElements);
        }

        myPhonebook.View.call(this, element);

        this.id = null;
        this.name = null;

        this.getChildElement("#btnCreateGroup").click(this.createGroup.bind(this));
        this.getChildElement("#btnUpdateGroup").click(this.updateGroup.bind(this));
        this.getChildElement("#btnCancelGroup").click(this.cancelGroup.bind(this));
    }

    AddGroupView.prototype = Object.create(myPhonebook.View.prototype);

    /**
     * Update DOM
     */
    AddGroupView.prototype.updateDOM = function () {
        $("div[name=panelWrp]").addClass("hide");
        $("#addGroup").removeClass("hide");
    }

    /**
     * Go back to group explorer
     */
    AddGroupView.prototype.cancelGroup = function () {
        dispatcher.emit('CANCEL', {});
    }

    /**
     * Create group
     */
    AddGroupView.prototype.createGroup = function () {
        this.name = $("#textName").val();

        if (this.name == '') {
            var obj = {
                message: 'Please fill all fields!',
            };

            dispatcher.emit('ALERT', obj);
            return;
        }

        var obj = {
            name: this.name,
        };

        dispatcher.emit('CREATE_GROUP', obj);

        $("#textName").val('');
    }

    /**
     * Update group
     */
    AddGroupView.prototype.updateGroup = function () {
        this.id = $("#hidGroupID").val();
        this.name = $("#textName").val();

        if (this.name == '') {
            alert('Please fill all fields!');
            return;
        }

        var obj = {
            id: this.id,
            name: this.name,
        };

        dispatcher.emit('UPDATE_GROUP', obj);

        $("#textName").val('');
    }

    /**
     * Update group
     * @param item
     */
    AddGroupView.prototype.updateElements = function (item) {
        event.stopPropagation();
        var self = this;

        $("#btnUpdateGroup").removeClass('hide');
        $("#btnCreateGroup").addClass('hide');

        $("#hidGroupID").val(item.id);
        $("#textName").val(item.name);

        this.updateDOM();
    }

    /**
     * Reset DOM elements
     */
    AddGroupView.prototype.emptyElements = function () {
        $("#btnCreateGroup").removeClass('hide');
        $("#btnUpdateGroup").addClass('hide');

        $("#hidGroupID").val('');
        $("#textName").val('');

        this.updateDOM();
    }

    /**
     * Delete group
     * @param item
     */
    AddGroupView.prototype.deleteElements = function (item) {
        event.stopPropagation();

        var obj = {
            id: item.id,
            message: 'Do you want to delete Group: "' + item.name + '" ?',
            emit: 'DELETE',
        };

        dispatcher.emit('PROMPT', obj);
    }

    return AddGroupView;
})();
