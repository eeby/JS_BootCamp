"use strict"

var MediaWidget = MediaWidget || {};

MediaWidget.Video = (function () {
    var StaticMediaItem = MediaWidget.StaticMediaItem;

    function Video(elem, video) {
        StaticMediaItem.call(this, elem);

        this.video = video;
    }

    inherit(Video, StaticMediaItem);

    Video.prototype.display = function () {
        var htmlString = this.video;
        StaticMediaItem.prototype.display.call(this, htmlString);
    }

    return Video;

})();