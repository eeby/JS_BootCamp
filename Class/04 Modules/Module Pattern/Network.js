var contactBook = contactBook || {};

contactBook.network = (function () {
    //
    //  Private data
    //
    var lastActivity;
    var baseUrl;

    //
    //  Functions
    //
    function httpGet(url){
        console.log("httpGet: " + url);
    }

    //
    //  Public API
    //
    return {
        httpGet: httpGet,
    };
})();

