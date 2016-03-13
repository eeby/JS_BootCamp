"use strict"

var MediaWidget = MediaWidget || {};

MediaWidget.RotationMediaItem = (function () {
    var MediaItem = MediaWidget.MediaItem;

    function RotationMediaItem(elem, interval, arr) {
        MediaItem.call(this, elem);
        this.interval = interval;
        this.arr = arr;
    }

    inherit(RotationMediaItem, MediaItem);

    RotationMediaItem.prototype.display = function () {
        var thisObj = this;
        console.log(this.arr);
        var htmlString = this.arr[Math.floor(Math.random() * this.arr.length) + 0];
        MediaItem.prototype.display.call(this, htmlString);

        window.setTimeout(function(){
            RotationMediaItem.prototype.display.call(thisObj);
        }, this.interval);
    }

    return RotationMediaItem;

})();