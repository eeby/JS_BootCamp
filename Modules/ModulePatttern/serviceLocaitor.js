/**
 * Created by elibe on 28/02/2016.
 */


var moudlePattern = moudlePattern || {};

moudlePattern.serviceLocator = (function(){

    var services = {};

    function resolve(service){
        if(!services[service]){
            throw Error('The service "' + service + '" doesn\'t exists');
        }
        return service;
    }

    function register(service, module){
        try {
            if (services[service]) {
                throw Error('The service "' + service + '" already exists');
            }
            else {
                services[service] = module;
            }
        }
        catch (ex){
            throw Error('The service "' + service + '" already exists');
        }
    }

    return{
        resolve: resolve,
        register: register,
    }

})();

