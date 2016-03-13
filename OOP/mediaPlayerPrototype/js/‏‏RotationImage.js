"use strict"

var MediaWidget = MediaWidget || {};

MediaWidget.RotationImage = (function () {
    var RotationMediaItem = MediaWidget.RotationMediaItem;

    function RotationImage(elem, interval) {
        RotationMediaItem.call(this, elem, interval, RotationImage.arrImages);
    }

    inherit(RotationImage, RotationMediaItem);

    RotationImage.prototype.display = function () {
        RotationMediaItem.prototype.display.call(this);
    }

    RotationImage.arrImages = [
        '<img src="images/2.jpg" />',
        '<img src="images/3.jpg" />',
        '<img src="images/4.jpg" />',
        '<img src="images/5.jpg" />',
        '<img src="images/6.jpg" />'
    ];

    return RotationImage;

})();