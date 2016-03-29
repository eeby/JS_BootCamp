"use strict"

var Dispatcher = (function () {

    /**
     *
     * @constructor
     */
    function Dispatcher() {
        this.events = {};
    }

    /**
     * Set handlers
     * @param eventName
     * @param obj
     * @param method
     */
    Dispatcher.prototype.on = function (eventName, obj, method) {
        var handlers = this.events[eventName];
        if (!handlers) {
            handlers = this.events[eventName] = [];
        }

        handlers.push({
            obj: obj,
            method: method,
        });
    }

    /**
     * Handlers trigered
     * @param eventName
     * @param args
     */
    Dispatcher.prototype.emit = function (eventName, args) {
        var handlers = this.events[eventName];
        if (!handlers) {
            return;
        }

        handlers.forEach(function (handler) {
            handler.method.call(handler.obj, args);
        });
    }

    return Dispatcher;
})();