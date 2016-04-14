'use strict';

var fs = require('fs-promise');

function getAll() {
    var path = 'pb.txt';

    try
    {
        if(fs.statSync(path).isFile()){
            return fs.readFile(path, 'utf8');
        }
    }
    catch (err)
    {
        var jsonStr = '[{"type":"GROUP","id":"-1","name":"Phone Book","items":"0"}]'
        fs.writeFile(path, jsonStr, 'utf8', function (err) {
            if (err) {
                return console.error(err);
            }

            console.log("SUCCESS: file created");
        });
    }

}

function save(objString) {
    var jsonStr = JSON.stringify(objString);

    fs.writeFile('pb.txt', jsonStr, 'utf8', function (err) {
        if (err) {
            return console.error(err);
        }

        console.log("SUCCESS: file created");
    });
}


module.exports.getAll = getAll;
module.exports.save = save;

