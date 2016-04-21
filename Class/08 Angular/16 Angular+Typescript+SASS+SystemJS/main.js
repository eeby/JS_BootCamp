/// <reference path="typings/tsd.d.ts" />
"use strict";
var module_1 = require("./app/common/module");
require("./app/directives/componentName");
require("./app/components/app");
init();
function init() {
    var element = document.getElementById("html");
    if (!element) {
        console.error("Root element was not found");
        return;
    }
    angular.bootstrap(element, [module_1.module.name]);
}
//# sourceMappingURL=main.js.map