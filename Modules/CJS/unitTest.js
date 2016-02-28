
var serviceLocator = require("./serviceLocator.js");

serviceLocator.register('console', console);

console.log(serviceLocator.resolve('console'));

