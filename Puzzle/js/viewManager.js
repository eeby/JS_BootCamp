var startOver = function() {
    var arr = [1,2,3,4,5,6,7,8,9];
    $("#puzzleWrp").html('');

    while (arr.length > 0){
        var index = Math.floor(Math.random() * arr.length);
        var id =  arr[index];
        var img = $('<img id="pImg' + id + '" src="images/' + id + '.jpg" name="' + id + '">');

        arr.splice(index, 1);
        $(img).bind("mousedown", function(){
            puzzle.mouseEvent.mouseDown(this, event);
        });
        $(img).bind('mouseover', function(){
            puzzle.mouseEvent.mouseOver(this);
        });
        $("#puzzleWrp").append(img);
    }

    $('#container').bind("mousemove", function(){
        puzzle.mouseEvent.mouseMove(event);
    });
    $('#container').bind("click", function(){
        puzzle.mouseEvent.mouseClick(this);
    });

}
startOver();
