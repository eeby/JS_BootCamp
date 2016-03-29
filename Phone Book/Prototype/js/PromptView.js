"use strict"

var myPhonebook = myPhonebook || {};

myPhonebook.PromptView = (function () {

    /**
     *
     * @param element
     * @constructor
     */
    function PromptView(element) {
        if (dispatcher) {
            dispatcher.on('PROMPT', this, this.showPrompt);
            dispatcher.on('ALERT', this, this.showAlert);

        }

        this.obj = null;

        myPhonebook.View.call(this, element);

        this.getChildElement(".btn-primary").click(this.confirmClicked.bind(this));
    }

    PromptView.prototype = Object.create(myPhonebook.View.prototype);

    /**
     * Show confirm prompt
     * @param obj
     */
    PromptView.prototype.showPrompt = function (obj) {
        this.obj = obj;
        $(".btn-primary").show();
        this.element.find('.modal-body').html(obj.message);
        this.element.modal();
    }

    /**
     * Confirmed button clicked
     */
    PromptView.prototype.confirmClicked = function () {
        dispatcher.emit(this.obj.emit, this.obj);
        this.element.modal('toggle');
    }

    /**
     * Show prompt
     * @param obj
     */
    PromptView.prototype.showAlert = function (obj) {
        this.obj = obj;
        $(".btn-primary").hide();
        this.element.find('.modal-body').html(obj.message);
        this.element.modal();
    }

    return PromptView;
})();
