var express = require('express');
var router = express.Router();

router.get("/get_time", function(req, res){
    var data = new Date();
    res.set("Content-Type", "application/javascript");
    res.send(req.query.callback + "(" + JSON.stringify(data) + ");");
    res.end();
});

router.get("/", function(req, res){
    res.set("Content-Type", "application/javascript");
    res.send(JSON.stringify(req.query.name));
    console.log(JSON.stringify(req.query.name));
    res.end();
});


module.exports = router;
