/**
 * Created by elibe on 21/02/2016.
 */

function createTree(comp){
    var tree = {
        root: null,
        comp: comp,
        count: 0
    }

    return tree;
}

function createNode(data){
    return {
        value: data,
        left: null,
        right: null
    };
}


function add(tree, data){
    var node = createNode(data);

    if(tree.root != null) {
        addNode(tree, node, tree.root);
    }
    else{
        tree.root = node;
    }
    tree.count += 1 ;
    return node;
}

function addNode(tree, newNode, parent) {
    var res = tree.comp(newNode.value, parent.value);
    switch (res) {
        case 1:
            if (parent.right == null) {
                parent.right = newNode;
            }
            else {
                addNode(tree, newNode, parent.right);
            }
            break;
        case -1:
            if (parent.left == null) {
                parent.left = newNode;
            }
            else {
                addNode(tree, newNode, parent.left);
            }
            break;
        case 0:
            //throw Error("Duplicated value" + newNode.value);
            break;
    }
}

function getCount(tree){
    return tree.count;
}

function scan(parent, func){
    scanNode(parent, func);
}

function scanNode(node, func){
    if(node == null) {
        return;
    }
    scanNode(node.left, func);
    func(node.value);
    scanNode(node.right, func)
}

function containsValue(tree, node, data) {
    if(node == null) {
        return false;
    }

    var res = tree.comp(data, node.value);
    if(res==0) {
        return true;
    }

    if(res > 0) {
        return containsValue(tree, node.right, data);
    }
    else{
        return containsValue(tree, node.left, data);
    }
}
