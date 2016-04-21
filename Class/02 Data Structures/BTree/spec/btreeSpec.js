var btree = require("./../btree");

var createTree = btree.createTree;
var add = btree.add;
var scan = btree.scan;
var contains = btree.contains;

describe("btree", function() {
    var tree = createTree(compare);

    it("'s count is 1 after invoking add for the first time", function(){
       add(tree, 1);

        expect(tree.count).toBe(1);
    });

    it("'s count is 2 after invoking add for the second time", function(){
        add(tree, 2);

        expect(tree.count).toBe(2);
    });
});


function compare(num1, num2) {
    return num1 - num2;
}
