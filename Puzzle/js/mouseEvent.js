var puzzle = puzzle || {};
puzzle.mouseEvent = (function() {

    var overItem = {};
    var selectedItem = {};

    function mouseDown(obj, event) {
        var mousePos = mouseCoords(event);

        updateItem(selectedItem, obj);

        $('#' + obj.id).attr('drag', 'drag');
        $('#container').show();
        $('#container').attr('src', obj.src);
        $('#container').attr('name', obj.name);
        $('#container').css({top: mousePos.y, left: mousePos.x});
    }

    function touchMove(event){
        var ev = event;
    }

    function mouseMove(event) {
        var mousePos = mouseCoords(event);
        var pX = event.pageX;
        var pY = event.pageY;

        $('#container').css({top: mousePos.y, left: mousePos.x});
    }

    function mouseOver(obj){
        updateItem(overItem, obj);
        $('#puzzleWrp img[drag]').each(function(){
            $(this).removeAttr('drag');
            $('#' + selectedItem.id).attr('src', $('#' + overItem.id).attr('src'));
            $('#' + selectedItem.id).attr('name', $('#' + overItem.id).attr('name'));
            $('#' + overItem.id).attr('src', $('#container').attr('src'));
            $('#' + overItem.id).attr('name', $('#container').attr('name'));
            $('#container').attr('src', '');

            checkPuzzle();
        })
    }

    function mouseClick(){
        $('#container').hide();
    }

    function checkPuzzle(){
        var counter = 0;
        $('#puzzleWrp img').each(function(index){
            if(this.name == index + 1){
                counter++;
            }
        });

        if(counter == 9){
            var ret = confirm('Congratulations, you have completed the puzzle successfully! \nPress OK to start over.');
            if(ret){
                startOver();
            }
        }
    }

    function updateItem(item, obj){
        item.id = obj.id;
        item.name = obj.name;
    }

    function mouseCoords(event) {
        var pX, pY;
        if(event.clientX < $('#puzzleWrp').width() && event.clientX > 0) {
            pX = event.clientX - 50;
        }

        if(event.clientY < $('#puzzleWrp').height() && event.clientY > 0){
            pY = event.clientY - 50;
        }

        return {
            x: pX,
            y:pY
        };
    }

    return{
        mouseDown: mouseDown,
        mouseOver: mouseOver,
        mouseMove: mouseMove,
        mouseClick: mouseClick,
    }
})();



