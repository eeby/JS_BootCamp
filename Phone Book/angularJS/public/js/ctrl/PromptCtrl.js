(function () {
    "use strict"

    /**
     *
     * @param element
     * @serivce
     */
    function PromptCtrl($scope, promptFactory) {
        this.promptFactory = promptFactory;

        $scope.$on('PROMPT', function(event, data) {
            console.log(data);
        });

        this.showModel = false;
        this.element = $("#myModal");
        this.message = {};

        /**
         * Show confirm prompt
         * @param obj
         */
        this.showPrompt = function () {
            this.showModel = this.toggleModal();

            this.message = this.promptFactory.getPromptMessage();
            this.element.modal();
        }

        this.toggleModal = function(){
            this.showModal = !this.showModal;
        }

        /**
         * Confirmed button clicked
         */
        this.confirmClicked = function () {
            this.element.modal('toggle');
        }

        /**
         * Show prompt
         * @param obj
         */
        this.showAlert = function (obj) {
            this.obj = obj;
            $(".btn-primary").hide();
            this.element.find('.modal-body').html(obj.message);
            this.element.modal();
        }

    }

    angular.module("app")
        .controller("PromptCtrl", PromptCtrl);

})();
