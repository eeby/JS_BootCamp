(function () {
    "use strict"

    function HomeCtrl(messageService) {
        this.messages = null;
        var vm = this;
        vm.messageService = messageService;

        vm.updateWall = function () {
            vm.messageService.addPostToWall(vm.message);

            vm.messages = this.messageService.getMessages();
            vm.reset();
        }

        vm.reset = function () {
            vm.message = '';
        }
    }

    angular.module("app")
        .controller("HomeCtrl", HomeCtrl);
})();
