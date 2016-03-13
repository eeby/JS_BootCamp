"use strict"

var MediaWidget = MediaWidget || {};

MediaWidget.MediaItem = (function () {

    function MediaItem(elem) {
        this.elem = elem;
    }

    MediaItem.prototype.display = function (htmlString) {
        $(this.elem).html(htmlString);
    }

    return MediaItem;

})();