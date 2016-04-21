var dispatcher = new AppDispatcher();

function AppDispatcher() {
    this.events = {};
}

AppDispatcher.prototype.on = function(eventName, obj, method) {
    var handlers = this.events[eventName];
    if(!handlers) {
        handlers = this.events[eventName] = [];
    }

    handlers.push({
        obj: obj,
        method: method,
    });
}

AppDispatcher.prototype.emit = function(eventName, args) {
    var handlers = this.events[eventName];
    if(!handlers) {
        return;
    }

    handlers.forEach(function(handler) {
        handler.method.call(handler.obj, args);
    });
}

var contactListView = {
    init: function() {
        dispatcher.on("LOGOUT", this, this.onLogout);
    },

    onLogout: function(userDetails) {
        console.log("LOGOUT: " + userDetails.userName);
    }
};

dispatcher.on("LOGOUT", 123, function(option) {
    console.log("LOGOUT: " + option.userName + ": " + this);
});

dispatcher.on("LOGIN", 456, function(options) {
    console.log("LOGIN: " + options.desc + ": " + this);
});

//contactListView.init();

dispatcher.emit("LOGOUT", {userName: "Ori"});
dispatcher.emit("LOGIN", {desc: true});
