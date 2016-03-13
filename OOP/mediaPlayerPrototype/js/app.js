"use strict"

var arrMediaItem = [];
var mw = new MediaWidget.Widget('#mediaContent', 300, 250);


arrMediaItem.push(new MediaWidget.RotationImage('#mediaContent', 3000));
arrMediaItem.push(new MediaWidget.NewsTicker('#mediaContent', 3000));
arrMediaItem.push(new MediaWidget.Paragraph('#mediaContent', 'Paragraph Paragraph Paragraph 111111111111111'));
arrMediaItem.push(new MediaWidget.Video('#mediaContent', '<iframe width="280" height="236"' +
    ' src="https://www.youtube.com/embed/Qq4j1LtCdww" frameborder="0" allowfullscreen></iframe>'));
arrMediaItem.push(new MediaWidget.Image('#mediaContent', 'images/4.jpg'));

for(var i=0; i<arrMediaItem.length; i++){
    mw.addMediaItem(arrMediaItem[i]);
}

mw.run().display();
