"use strict"

//var sqlite = require('sqlite3').verbose();
//var db = new sqlite.Database('./myDB.sqlite');

var db = require('./DB');
var q = require('q');

function Student() {
    this.first_name = null;
    this.last_name = null;
    this.phone = null;
    this.age = null;
}

Student.select = function (id) {
    var obj = {
        type: 'SELECT',
        query: "SELECT * FROM students WHERE id=" + id,
    };


    q(db.select(obj)).then(function (res) {
        console.log(res.row)
    });

}

//
//Student.selectAll = function () {
//    db.all("SELECT id, first_name, last_name, phone FROM students", function (err, rows) {
//        if (err) {
//            console.log(err);
//        }
//        else {
//            rows.forEach(function (row) {
//                console.log('ID: ' + row.id + '\nFirst Name: ' + row.first_name + '\nLast Name: ' + row.last_name + '\nPhone: ' + row.phone + '\n');
//            });
//        }
//    });
//}

Student.create = function (studentArr) {
    var obj = {
        type: 'INSERT',
        query: "INSERT INTO students (first_name, last_name, phone, age) VALUES (?,?,?,?)",
        studentArr: studentArr,
    };

    var resObj = db.run(obj);

    if(!resObj.err){
        return new Student(this.select(resObj.lastID));
    }

    return null;
}

//Student.update = function (obj) {
//    db.run("UPDATE students SET first_name='" + obj.first_name + "' WHERE id=" + obj.id, function (err) {
//        if (err) {
//            console.log(err);
//        }
//    });
//}
//
//Student.delete = function (id) {
//    db.run("DELETE FROM students WHERE id=" + id, function (err) {
//        if (err) {
//            console.log(err);
//        }
//    });
//}

module.exports = Student;

