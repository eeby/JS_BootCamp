var phoneBook = phoneBook || {};

phoneBook.itemManager = (function() {
    phoneBook.displayManager.doSomething();

    function doSomething2() {
        phoneBook.displayManager.doSomething3();
    }
})();

phoneBook.displayManager = (function() {
    var TABLE_ELEMENT_ID = "contactTable";

    function doSomething() {
    }

    function doSomething3() {
    }

    function createClickHandler(group) {
        return function handleClick() {
            phoneBook.itemManager.doSomething2(group);
        }
    }

    var group;
    li.onclick = createClickHandler(group);

    return {
      doSomething: doSomething,
    };
});