function LinkList() {

    var head = null;
    var tail = null;

    function insertLast(data) {
        var node = createNode(data);

        if (tail) {
            tail.next = node;
            tail = node;
        }
        else {
            head = tail = node;
        }
    }

    function equals(other, comp) {
        var arr1 = other.toArray();
        var arr2 = toArray();

        if (arr1.length != arr2.length) {
            return false;
        }

        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] != arr2[i]) {
                return false;
            }
        }

        return true;
    }

    function toArray() {
        var arr = [];

        var node = head;
        while (node != null) {
            arr.push(node.data);

            node = node.next;
        }

        return arr;
    }

    function createNode(data) {
        return {
            data: data,
            next: null,
        };
    }

    return {
        insertLast: insertLast,
        equals: equals,
        toArray: toArray,
    };
}
