"use strict"

var MediaWidget = MediaWidget || {};

MediaWidget.Paragraph = (function () {
    var StaticMediaItem = MediaWidget.StaticMediaItem;

    function Paragraph(elem, paragraph) {
        StaticMediaItem.call(this, elem);

        this.paragraph = paragraph;
    }

    inherit(Paragraph, StaticMediaItem);

    Paragraph.prototype.display = function () {
        var htmlString = '<p>' + this.paragraph + '</p>';
        StaticMediaItem.prototype.display.call(this, htmlString);
    }

    return Paragraph;

})();