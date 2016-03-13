/**
 * Created by elibe on 18/02/2016.
 */

var now = new Date();
var oldMessage;

function setMessage(){
    var tName = document.getElementById('tName').value;
    if(tName == ""){
        document.getElementById('sName').className ='alr';
        return;
    }
    document.getElementById('sName').className ='hide';
    appendMessage();
}

function chkkMessageLen(){
    var txtMessage  = document.getElementById('tMessage').value;

    if(txtMessage.length > 10){
        document.getElementById('tMessage').setAttribute("class","borderRed");
        document.getElementById('sMessage').className ='alr';
        document.getElementById('tMessage').value = oldMessage;
    }
    else{
        oldMessage =  document.getElementById('tMessage').value;
        document.getElementById('sMessage').className ='hide';
    }
}

function appendMessage(){
    var divParent   = document.getElementById('rightWrp');
    var divMessage  = document.createElement("DIV");
    var txtName     = document.createTextNode(document.getElementById('tName').value + " > ");
    var txtMessage  = document.createTextNode(document.getElementById('tMessage').value);

    divMessage.setAttribute("class","bdrWrp paddingContainer messageWrp");
    divMessage.appendChild(txtName);
    divMessage.appendChild(txtMessage);
    divParent.appendChild(divMessage);

    document.getElementById('tName').value  = "";
    document.getElementById('tMessage').value = "";

}

(function(){
    var ul  = document.createElement("UL");

    for(var i=1; i<11; i++){
        var li = document.createElement("LI");
        var txtLi = document.createTextNode(i);

        li.setAttribute("id",i);
        //li.setAttribute("onclick","alert('this.id)");
        li.appendChild(txtLi);
        li.onclick= getIndex(i);
        ul.appendChild(li);
    }
    document.getElementById('rightWrp').appendChild(ul);
})();

function getIndex(index){
    return function(){
        alert('hi, you have clicked ' + index);
    }
}
