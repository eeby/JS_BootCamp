"use strict"

var puzzle = puzzle || {};
puzzle.kickstarter = (function () {

    var board = $('#boardWrp');

    var numberPuzzelElements = 9;

    init();

    return {
        init: init,
    }

    /**

     */
    function init() {
        clearBoard();
        setBoard();
    }

    function clearBoard() {
        board.html('');
    }

    function setBoard() {
        var arr = [];
        for (var i = 0; i < 9; i++) {
            var number = getRandomNumber();
            var element = appendBoardWithElement(number);
            board.append(element);
        }

        bindWithMouseEvents();

        function bindWithMouseEvents(){
            board.children().each(function () {
                $(this).bind('mousedown', function () {
                    puzzle.mouseEvent.mouseDown(this, event);
                });
            });
        }

        function getRandomNumber() {
            var randomNumber;
            var ret;
            do {
                randomNumber = Math.floor(Math.random() * numberPuzzelElements) + 1;
                ret = contains(randomNumber, arr);

                if (!ret) {
                    arr.push(randomNumber);
                }
            }
            while (ret);

            return arr[arr.length - 1];
        }

        function contains(number, arr) {
            var i = arr.length;
            while (i--) {
                if (arr[i] == number) {
                    return true;
                }
            }
            return false;
        }

        function appendBoardWithElement(item) {
            var id = 'pImg' + item;
            var src = 'images/' + item + '.jpg';
            var name = item;
            var element = $('<img id="' + id + '" src="' + src + '" name="' + name + '">');

            return element;
        }
    }
})();


