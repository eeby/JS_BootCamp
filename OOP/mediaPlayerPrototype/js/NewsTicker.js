"use strict"

var MediaWidget = MediaWidget || {};

MediaWidget.NewsTicker = (function () {
    var RotationMediaItem = MediaWidget.RotationMediaItem;

    function NewsTicker(elem, interval) {
        RotationMediaItem.call(this, elem, interval, NewsTicker.arrTicker);
    }

    inherit(NewsTicker, RotationMediaItem);

    NewsTicker.prototype.display = function () {
        RotationMediaItem.prototype.display.call(this);

    }

    NewsTicker.arrTicker = [
        '<p>Lorem ipsum dolor sit amet, ei est debet quaestio scripserit. Nam ad augue affert dicunt, duis quas' +
        ' democritum mei an. Ne mea labore omittantur, mel et nihil graeci appetere, eu malorum democritum qui.' +
        ' Error doctus id his. Ius admodum iracundia ea, duo debet impetus indoctum no, est vivendum disputationi eu.</p>',
        '<p>Duis graeco scriptorem ea ius, mel an quot bonorum. Virtute fabulas ne eum. In qui denique recusabo' +
        ' consectetuer, id quo malis ponderum. Mea eu everti maiorum reprimique, tale iudicabit ad </p>',
        '<p>Quando diceret blandit in usu, cetero perpetua expetendis cu vim. An sint salutatus mel, fugit facer at' +
        ' eam. Nam ancillae accumsan delicata no, qui doctus scripserit ad. Ad eam aeque blandit. Has ex legimus' +
        ' ancillae assueverit, nam virtute suscipit accommodare ei. Has possit dolorum mandamus no.</p>'
    ];

    return NewsTicker;

})();