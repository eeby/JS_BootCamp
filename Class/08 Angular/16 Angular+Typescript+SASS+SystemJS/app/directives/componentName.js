"use strict";
var module_1 = require("../common/module");
module_1.module.directive("componentName", function ($parse) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            var componentScope = element.isolateScope();
            if (!componentScope) {
                return;
            }
            var component = componentScope.$ctrl;
            if (!component) {
                return;
            }
            var nameFn = $parse(attrs.componentName);
            if (!nameFn.assign) {
                return;
            }
            nameFn.assign(scope, component);
        }
    };
});
//# sourceMappingURL=componentName.js.map