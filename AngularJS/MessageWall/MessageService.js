(function() {
    "use strict"

    function MessageService() {
        var counter = 0;
        var messages = [];

        var addPostToWall = function (message) {
            counter++;
            messages.push({id: counter, message: message});
        }

        var getMessages = function () {
            return messages;
        }

        return {
            getMessages: getMessages,
            addPostToWall: addPostToWall,
        }
    }

    //MessageService.prototype.addPostToWall = function (message) {
    //    this.counter++;
    //    this.messages.push({id: this.counter, message: message});
    //}
    //
    //MessageService.prototype.get = function () {
    //    return this.messages;
    //}

    angular.module("app")
        .factory("messageService", MessageService);

})();
