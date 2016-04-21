(function () {
    function HomeCtrl($scope) {
        this.nodes = [
            {
                name: "A", nodes: [
                {name: "A1"},
                {name: "A2"},
                {
                    name: "A3", nodes: [
                    {name: "A31"},
                    {name: "A32"},
                    {name: "A33"},
                ]
                },
            ]
            },
            {name: "B"},
            {name: "C"},
        ];

        this.change = function() {
            this.nodes[0].nodes = [];
        }
    }

    angular.module("myApp").controller("HomeCtrl", HomeCtrl);
})();
