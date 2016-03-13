"use strict"

var MediaWidget = MediaWidget || {};

MediaWidget.Image = (function () {
    var StaticMediaItem = MediaWidget.StaticMediaItem;

    function Image(elem, src) {
        StaticMediaItem.call(this, elem);

        this.src = src;
    }

    inherit(Image, StaticMediaItem);

    Image.prototype.display = function () {
        var htmlString = '<img src="' + this.src + '" />';
        StaticMediaItem.prototype.display.call(this, htmlString);
    }

    return Image;

})();