(function () {
    "use strict"

    function ClockDirectiveController($scope, $attrs, $parse) {
        $scope.grade.check();

        if ($attrs.grade) {

            $scope.$parent.$watch($attrs.grade, function (newValue) {
                console.log(newValue);
                $scope.grade.grade = newValue;
            });
        }
    }



    angular.module("app").directive("gradeSmile", function () {
        return {
            controller: ClockDirectiveController,
            restrict: 'E',
            replace: true,
            templateUrl: "grade-smile.html",
            bindToController: true,
            controllerAs: "grade",
            scope: {
                grade: "=theGrade",
                check: "&gradeFunc",
            },
        };
    });


})();
