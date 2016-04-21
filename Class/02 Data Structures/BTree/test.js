var btree = require("./btree");
var createTree = btree.createTree;
var add = btree.add;
var scan = btree.scan;
var contains = btree.contains;

var tree = createTree(compare);

add(tree, 10);
add(tree, 5);
add(tree, 2);
add(tree, 8);
add(tree, 7);

var arr = [];

scan(tree, function (num) {
    arr.push(num);
});

if (arr.length != 5) {
    throw Error("Actual count is " + arr.length + " while expecting 5");
}

console.log(arr);
var expectedArr = [2, 5, 7, 8, 10];
for (var i = 0; i < 5; i++) {
    if (arr[i] != expectedArr[i]) {
        throw Error("Scan did not return sorted data");
    }
}

if(!contains(tree, 5)){
    throw Error("5 was not found");
}

console.log("PASS");

function compare(num1, num2) {
    return num1 - num2;
}
