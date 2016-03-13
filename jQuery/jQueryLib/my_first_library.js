var func = (function(args) {
    var container = args.container || window;
    var propname = args.propname || 'MyLib';

    function hide(){
        document.querySelector("body").style.display = "none";
    }

    function show(){
        document.querySelector("body").style.display = "block";
    }

    function find(elemClass){
        document.querySelector('.' + elemClass).style.backgroundColor = "red";
    }

    function remove(id){
        var element = document.getElementById(id);
        element.parentNode.removeChild(element)
    }

    var revealing = {
        hide: hide,
        show: show,
        find: find,
        remove: remove
    };

    container[propname] = revealing;
    
});

func({container: window, propname: '$'});
func({container: window, propname: 'jQuery'});
