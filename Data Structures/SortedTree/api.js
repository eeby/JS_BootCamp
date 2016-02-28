/**
 * Created by elibe on 21/02/2016.
 */
(function(){
    var comp = function(d1, d2){
        if(d1 > d2){
            return 1;
        }
        else if(d1 < d2){
            return -1;
        }
        else{
            return 0;
        }
    }

    var arr = [];
    var printer = function(data){
        arr.push(data);
    }

    var tree = createTree(comp);
    for(var i=0; i<20; i++) {
        add(tree, Math.floor((Math.random() * 200) + 1));
    }

    scan(tree.root, printer);
    console.log("Contains Value: 15 " + containsValue(tree, tree.root, 15)
                + "\nTree elements count: " + getCount(tree)
                + "\nList of elements: " + arr);





    console.log();
})();