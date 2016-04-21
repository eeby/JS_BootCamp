var linkList = require("./linkedList");

var listInsertLast = linkList.listInsertLast;
var listInsertBefore = linkList.listInsertBefore;
var listGetData = linkList.listGetData;
var listGetFirst = linkList.listGetFirst;
var listGetNext = linkList.listGetNext;

var ori = { id: 1, name: "Ori" };
var roni = {id:2, name: "Roni"};
var udi = {id:3, name: "Udi"};
var beni = {id:4, name: "Beni"};

listInsertLast(ori);
var pos = listInsertLast(roni);
listInsertLast(udi);
listInsertBefore(pos, beni);

pos = listGetFirst();
while (pos) {
    var data = listGetData(pos);

    console.log(data.id + ": " + data.name);
    pos = listGetNext(pos);
}
