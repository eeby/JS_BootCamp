function createTree(compare){
    var tree = {
        root: null,
        count: 0,
        compare: compare,
    };

    return tree;
}

function add(tree, data) {
    var newNode = createNode(data);

    if (!tree.root) {
        tree.root = newNode;
        tree.count = 1;
    }
    else {
        addNode(tree, tree.root, newNode)
    }
}

function addNode(tree, node, newNode){
    var res = tree.compare(newNode.data, node.data);
    if(res == 0){
        throw Error("Cannot insert duplicated value: " + newNode.data)
    }
    else {
        var SIDE = (res > 0 ? "right" : "left");
        if(node[SIDE]){
            addNode(tree, node[SIDE], newNode);
        }
        else {
            node[SIDE] = newNode;
            ++tree.count;
        }
    }
}

function scan(tree, func) {
    scanNode(tree.root, func);
}

function contains(tree, data) {
    return containsNode(tree, tree.root, data);
}

function containsNode(tree, node, data) {
    if(node == null) {
        return false;
    }

    var res = tree.compare(data, node.data);
    if(res==0) {
        return true;
    }

    if(res > 0) {
        return containsNode(tree, node.right, data);
    }
    else{
        return containsNode(tree, node.left, data);
    }
}

function scanNode(node, func){
    if(node == null) {
        return;
    }

    scanNode(node.left, func);

    func(node.data);

    scanNode(node.right, func)
}

function createNode(data){
    return {
        data: data,
        left: null,
        right: null,
    };
}

module.exports = {
    createTree: createTree,
    add: add,
    scan: scan,
    contains: contains,
};
