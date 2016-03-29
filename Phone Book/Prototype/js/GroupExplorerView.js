"use strict"

var myPhonebook = myPhonebook || {};

myPhonebook.GroupExplorerView = (function () {

    /**
     *
     * @param element
     * @constructor
     */
    function GroupExplorerView(element) {
        if (dispatcher) {
            dispatcher.on('UPDATE_DOM', this, this.updateDOMWithCurrentGroup);
            dispatcher.on('UPDATE_DOM_WITH_FOUNDED', this, this.bindElementsFound);

            dispatcher.on('CANCEL', this, this.showPanel);
        }

        myPhonebook.View.call(this, element);

        this.items = null;
        this.container = this.getChildElement("ul");
        this.currentGroup = null;
        this.fundedPanel = false;
        this.contactTemplate = null;

        this.loadTemplate();
    }

    GroupExplorerView.prototype = Object.create(myPhonebook.View.prototype);

    /**
     * Load template
     */
    GroupExplorerView.prototype.loadTemplate = function () {
        var templateElement = this.getChildElement("ul");

        this.contactTemplate = templateElement.html();
        templateElement.empty();
    }

    /**
     * Update DOM with current group
     * @param currentGroup
     */
    GroupExplorerView.prototype.updateDOMWithCurrentGroup = function (currentGroup) {
        this.bind(currentGroup);
    }

    /**
     * Bind data
     * @param currentGroup
     */
    GroupExplorerView.prototype.bind = function (currentGroup) {
        this.fundedPanel = false;

        if (currentGroup.items == undefined) {
            this.items = currentGroup;
        }
        else {
            this.items = currentGroup.items;
            this.currentGroup = currentGroup;
        }

        this.updateDOM();
    }

    /**
     * Bind data with searched text
     * @param currentGroup
     */
    GroupExplorerView.prototype.bindElementsFound = function (arr) {
        this.items = arr;
        this.fundedPanel = true;
        this.updateDOM();
    }

    /**
     * Show group explorer panel
     */
    GroupExplorerView.prototype.showPanel = function () {
        $("div[name=panelWrp]").addClass("hide");
        $("#directoryTree").removeClass("hide");
    }

    /**
     * Update DOM
     */
    GroupExplorerView.prototype.updateDOM = function () {
        this.showPanel();
        var self = this;

        this.container.empty();

        self.items.forEach(function (item, index) {
            var elem = $(self.contactTemplate);

            switch (item.type) {
                case 'GROUP':
                    elem.find(".ico").attr('src', './images/ico_f.png');
                    elem.find(".name").html(item.name);
                    elem.find(".name").attr('name', item.id);
                    elem.find(".del").click(self.deleteGroupClicked.bind(self, item));
                    elem.find(".del").attr('title', 'Click to delete');
                    elem.find(".edit").click(self.editGroupClicked.bind(self, item));
                    elem.find(".edit").attr('title', 'Click to edit');
                    break;
                case 'CONTACT':
                    elem.find(".ico").attr('src', './images/ico_c.png');
                    elem.find(".name").html(item.firstName + ' ' + item.lastName);
                    elem.find(".del").remove();
                    elem.find(".edit").remove();
                    break;
            }

            elem.click(self.onElemClicked.bind(self, item));
            self.container.append(elem);
        });

        var groupNameWrp = this.addGroupHeader();
        self.container.prepend(groupNameWrp);
    }

    /**
     * Update group name title
     * @returns {*|jQuery|HTMLElement}
     */
    GroupExplorerView.prototype.addGroupHeader = function () {
        var groupNameWrp = $("<DIV />");
        var groupNameTitle = $("<H3 />");
        var groupBackButton = $("<IMG />");

        groupNameTitle.text(this.currentGroup.name);
        groupBackButton.attr({src: "./images/go_b.png", class: "backBtn"});


        if (this.fundedPanel) {
            groupNameWrp.append(groupBackButton);
            groupBackButton.click(this.bind.bind(this, this.currentGroup));
        }
        else {
            if (this.currentGroup.id != -1) {
                groupNameWrp.append(groupBackButton);
            }

            groupNameWrp.append(groupNameTitle);
            groupBackButton.click(this.goBackToParent.bind(this));
        }

        return groupNameWrp;
    }

    /**
     * Go back to parent group
     */
    GroupExplorerView.prototype.goBackToParent = function () {
        dispatcher.emit('CHANGE_GROUP', this.currentGroup.parent);
        this.bind(this.currentGroup.parent);

    }

    /**
     * Item clicked in group explorer
     * @param item
     */
    GroupExplorerView.prototype.onElemClicked = function (item) {
        if (item.type == 'GROUP') {
            dispatcher.emit('CHANGE_GROUP', item);
            this.bind(item);
        }
        else {
            dispatcher.emit('UPDATE_DOM_CONTACT', item);
        }
    }

    /**
     * Delete group button clicked
     * @param item
     */
    GroupExplorerView.prototype.deleteGroupClicked = function (item) {
        dispatcher.emit('DELETE_THE_GROUP', item);
    }

    /**
     * Edit group button clicked
     * @param item
     */
    GroupExplorerView.prototype.editGroupClicked = function (item) {
        dispatcher.emit('UPDATE_DOM_GROUP', item);
    }

    return GroupExplorerView;
})();
