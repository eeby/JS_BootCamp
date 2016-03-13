"use strict"

var puzzle = puzzle || {};
puzzle.mouseEvent = (function () {

    var board = $('#boardWrp');
    var floater = $('#floater');
    var overItem = {};
    var selectedItem = {};

    floater.bind('mousemove', function () {
        mouseMove(event);
    });
    floater.bind('click', function () {
        mouseClick(this);
    });

    return {
        mouseDown: mouseDown,
    }

    function mouseDown(obj, event) {
        var mousePos = getMouseCoords(event);

        bindWithMouseEvents();

        updateItemWithNameAndSource(selectedItem, obj);

        updateFloater(obj, mousePos);

        function updateFloater(obj, mousePos) {
            floater.show();
            floater.attr('src', obj.src);
            floater.attr('name', obj.name);
            floater.css({top: mousePos.y, left: mousePos.x});
        }

        function bindWithMouseEvents() {
            board.children().each(function () {
                $(this).bind('mouseover', function () {
                    mouseOver(this);
                });
            });
        }
    }

    function mouseMove(event) {
        var mousePos = getMouseCoords(event);

        floater.css({top: mousePos.y, left: mousePos.x});
    }

    function mouseOver(obj) {

        updateItemWithNameAndSource(overItem, obj);

        replacePuzzelElements();

        unbindWithMouseEvents();

        function replacePuzzelElements() {
            $('#' + selectedItem.id).attr('src', $('#' + overItem.id).attr('src'));
            $('#' + selectedItem.id).attr('name', $('#' + overItem.id).attr('name'));
            $('#' + overItem.id).attr('src', floater.attr('src'));
            $('#' + overItem.id).attr('name', floater.attr('name'));

            clearFloater();

            function clearFloater() {
                floater.attr('src', '');
            }
        }

        function unbindWithMouseEvents() {
            board.children().each(function () {
                $(this).unbind('mouseover');
            });
        }

        checkPuzzle();
    }

    function mouseClick() {
        floater.hide();
    }

    function checkPuzzle() {
        var counter = 0;
        board.children().each(function (index) {
            if (this.name == index + 1) {
                counter++;
            }
        });

        if (counter == 9) {
            var ret = confirm('Congratulations, you have completed the puzzle successfully!' +
                '\nPress OK to start over.');
            if (ret) {
                puzzle.kickstarter.init();
            }
        }
    }

    function updateItemWithNameAndSource(item, obj) {
        item.id = obj.id;
        item.name = obj.name;
    }

    function getMouseCoords(event) {
        return {
            x: event.clientX - 50,
            y: event.clientY - 50
        };
    }
})();



