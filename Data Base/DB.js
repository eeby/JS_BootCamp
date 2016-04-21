"use strict"

var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./myDB.sqlite');
var q = require('q');

function DB() {
    this.data = null;
    this.err = null;
}

DB.select = function (obj) {
    var self = this;

    q(db.each(obj.query, function (err, row) {
        console.log(this.row)
        return {
            err: err,
            row: this.row,
        }
    })).then(function (obj) {
        console.log(obj.row);
    });

    //db.each("SELECT * FROM students WHERE id=" + id, function (err, row) {
    //    return {
    //        err: err,
    //        row: row,
    //    }
    //});
}

DB.create = function (obj) {
    db.run(obj.query, obj.studentArr, function () {
        return {
            err: self.err,
            lastID: self.lastID,
        }
    });
}

DB.update = function (obj) {
    db.each(obj.query, function () {
        return {
            err: self.err,
            row: self.row,
        }
    });
}


DB.delete = function (obj) {
    db.each(obj.query, function () {
        return {
            err: self.err,
            row: self.row,
        }
    });
}

module.exports = DB;
