angular.module("myApp").factory("eventDispatcherService", function() {
    var listeners = [];
    
    function register(obj) {
        listeners.push(obj);
    }

    function unregister(obj) {
        var index = listeners.indexOf(obj);
        if(index != -1) {
            listeners.splice(index, 1);
        }
    }
    
    return {
        register: register,
        unregister: unregister,
    };
});
