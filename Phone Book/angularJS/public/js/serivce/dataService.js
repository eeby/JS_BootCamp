(function () {
    'use strict';

    function DataService(groupService, $http, $rootScope) {
        var self = this;
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.root = null;

        this.getAll().then(setInitData,
            function () {
                self.$rootScope.$broadcast('newPhoneBook');
            });

        function setInitData(res) {
            self.root = res.data;
            self.$rootScope.$broadcast('showCurrentGroup');
        }
    }


    DataService.prototype.getAll = function () {
        var self = this;
        return self.$http({method: 'get', url: 'api/items'});
    };

    DataService.prototype.WriteIOFile = function (root) {
        this.root = root;
        var arr  = [];
        this.convertObjectToString(this.root, arr);

        this.saveFile(arr);

    }

    DataService.prototype.saveFile = function (arr) {
        this.$http({method: 'post', url: 'api/items/', data: arr}).then(function (res) {
            console.log(res.data);
        });
    };



    DataService.prototype.convertObjectToString = function (currentGroup, arr) {
        var self = this;
        arr.push(this.convertGroupToString(currentGroup));
        currentGroup.items.forEach(function (item) {
            if (item.type == "CONTACT") {
                arr.push(self.convertContactToString(item));
            }
        });

        currentGroup.items.forEach(function (item) {
            if (item.type == "GROUP") {
                self.convertObjectToString(item, arr);
            }
        });
    }

    DataService.prototype.convertGroupToString = function (item) {
        var objString = '{';
        objString += '"type": "' + item.type + '",';
        objString += '"id": "' + item.id + '",';
        objString += '"name": "' + item.name + '",';
        objString += '"items": "' + item.childrenCount + '"';
        objString += '}';

        return JSON.parse(objString);
    }

    DataService.prototype.convertContactToString = function (item) {
        var objString = '{';
        objString += '"type": "' + item.type + '",';
        objString += '"id": "' + item.id + '",';
        objString += '"firstName": "' + item.firstName + '",';
        objString += '"lastName": "' + item.lastName + '",';
        objString += '"phoneNumbers": "' + item.phoneNumbers + '"';
        objString += '}';

        return JSON.parse(objString);
    }

    angular.module('app').service('dataService', DataService);
})();
