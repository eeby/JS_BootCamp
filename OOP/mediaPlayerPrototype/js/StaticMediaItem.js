"use strict"

var MediaWidget = MediaWidget || {};

MediaWidget.StaticMediaItem = (function () {
    var MediaItem = MediaWidget.MediaItem;

    function StaticMediaItem(elem) {
        MediaItem.call(this, elem);
    }

    inherit(StaticMediaItem, MediaItem);

    StaticMediaItem.prototype.display = function (htmlString) {
        MediaItem.prototype.display.call(this, htmlString);
    }

    return StaticMediaItem;

})();