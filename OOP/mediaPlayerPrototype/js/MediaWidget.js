"use strict"

var MediaWidget = MediaWidget || {};

MediaWidget.Widget = (function () {
    function Widget(elem, width, height) {
        this.elem = elem;
        this.width = width;
        this.height = height;
        this.medias = [];
    }

    Widget.prototype.addMediaItem = function (item) {
        this.medias.push(item);
    }

    Widget.prototype.run = function () {
        var width = this.width + 'px';
        var height = this.height + 'px';

        $(this.elem).css({width: width, height: height});

        return this.medias[Math.floor(Math.random() * this.medias.length) + 0];
    }

    return Widget;

})();