var lastPosition = null;
var firstPosition = null;

function listInsertLast(data) {
    var nextPosition = null;

    if (!lastPosition) {
        firstPosition = lastPosition = createNode(data, null, null);
    }
    else {
        nextPosition = createNode(data, lastPosition, null);

        lastPosition.next = nextPosition;
        lastPosition = nextPosition;
    }

    return lastPosition;
}

function listGetNext(pos) {
    return pos.next;
}

function listGetFirst() {
    return firstPosition;
}

function listGetData(pos) {
    return pos.data;
}

function listInsertBefore(pos, data) {
    var prevNode = pos.prev;

    var insertedNode = createNode(data, prevNode, pos);

    if (prevNode) {
        prevNode.next = insertedNode;
    } else {
        firstPosition = insertedNode;
    }

    pos.prev = insertedNode;

    return insertedNode;
}

function Node(data, prev, next) {
    this.data = data;
    this.prev = prev;
    this.next = next;
}

function createNode(data, prev, next) {
    return {
        data: data,
        prev: prev,
        next: next,
    };
}

if (typeof module == undefined) {
    //
    //  Browser
    //
}
else {
    //
    //  NodeJS
    //
    module.exports = {
        listInsertLast: listInsertLast,
        listInsertBefore: listInsertBefore,
        listGetData: listGetData,
        listGetFirst: listGetFirst,
        listGetNext: listGetNext,
    };

}
