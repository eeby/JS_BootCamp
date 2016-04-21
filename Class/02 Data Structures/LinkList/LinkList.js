
var ori = {id: 1, name: "Ori"};
var roni = {id:2, name: "Roni"};
var udi = {id:3, name: "Udi"};
var beni = {id:4, name: "Beni"};

listInsertLast(ori);
var pos = listInsertLast(roni);
listInsertLast(udi);
listInsertBefore(pos, beni);

var pos = listGetFirst();
while (pos) {
    var data = listGetData(pos);
    console.log(data.id + ": " + data.name);
	
    pos = listGetNext(pos);
}
