var Menu = (function() {

    function Menu(element) {
        View.call(this, element);

        this.getChildElement(".reverse-order").click(this.reverseOrder.bind(this));

        this.test = "sqwidjdoi";
    }

    Menu.prototype = Object.create(View.prototype);

    Menu.prototype.reverseOrder = function() {
        alert(this.test);

        return false;
    }

    Menu.prototype.updateDOM = function() {
    }

    return Menu;
})();
