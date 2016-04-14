(function () {
    "use strict"

    function GroupService() {


        /**
         * Create new group
         * @param name
         * @serivce
         */
        this.Group = function (name, nextID) {
            this.id = nextID;
            this.type = 'GROUP';
            this.name = name;
            this.items = [];
            this.childrenCount = 0;
        }
    }

    angular.module("app")
        .service("groupService", GroupService);
})();

