var socket = io('http://localhost');

var elem = $('#theTextarea');
socket.on('currentData', function (data) {
    socket.emit('myClient', function (data) {
        elem.value = data;
    });

});

socket.on('dataChange', function (data) {
    $('#theTextarea').val(data);
});

socket.on('init', function (data) {
    $('#theTextarea').val(data);
})

var timeOut;
elem.keyup(function () {
    var self = this;
    clearTimeout(timeOut);
    timeOut = setTimeout(function(){
        socket.emit('myServer', self.value);
    }, 350);
});


var url = "http://localhost/api/ver1.0/";

function jsonp(url) {
    var head = document.head;
    var script = document.createElement("script");

    script.setAttribute("src", url);
    head.appendChild(script);
    head.removeChild(script);


    setTimeout(getTime, 1000);
}

function getTime(){
    jsonp(url + 'get_time?callback=myfunc');
}

getTime();

function myfunc(data) {
    document.getElementById("time").textContent = JSON.stringify(data);
}

var name = $('#txtName').value;
console.log(name);

$.ajax({
    type: "GET",
    url: url,
    data: { name: "udi", email: "udi@gmail.com" },
    success: function (responseText) {
        console.log(responseText);
        $("#status").html("Done: " + responseText);
    },
    error: function () {
        status.text("Error");
    }
});