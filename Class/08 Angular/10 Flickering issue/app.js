angular.module("myApp", []).run(function() {
    //$("body").append("<h1>XYZ</h1>");
    //$("body").append("<script>alert('XXX');</script>");
    $("body .placeholder").text("<script>alert('XXX');</script>");

    console.log($("body .placeholder").html());
});

