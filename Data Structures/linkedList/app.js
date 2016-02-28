/**
 * Created by elibe on 14/02/2016.
 */

var ori             = {id:1, name: "Ori"};
var roni            = {id:2, name: "Roni"};
var udi             = {id:3, name: "Udi"};
var beni            = {id:4, name: "Beni"};
var firstNode       = null;
var lastNode        = null;
var currentNode     = null;

(function init(){
    listInsertLast(ori);
    listInsertLast(roni);
    var pos = listInsertLast(udi);
    listInsertBefore(pos, beni)
    printList();
})();

function createNode(data, prev, next) {
    var node = {
        data: data,
        next: next,
        prev: prev
    }
    return node;
}

function listInsertLast(data){
    var pos = createNode(data, lastNode, null);

    if(firstNode == null){
        firstNode = lastNode  = pos;
    }
    else {
        lastNode.next = pos;
        currentNode = pos;
        currentNode.prev = lastNode;
        lastNode = currentNode;
    }
    return lastNode;
}

function listInsertBefore(pos, data){
    if(pos.prev == null){
        var newFirstNode = createNode(data, null, firstNode);
        firstNode.prev = newFirstNode;
        firstNode = newFirstNode;
    }
    else{
        currentNode = createNode(data, pos.prev, pos);
        var prevNode = pos.prev;
        prevNode.next = pos.prev = currentNode;
    }
}

function printList(){
    var pos = firstNode;
    while (true){
        console.log(pos.data.name);
        if(pos.next == null)
        {
            break;
        }
        else{
            pos = pos.next;
        }
    }
}