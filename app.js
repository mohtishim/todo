var paraElement = document.getElementById('para')
var para = 0;

var interval;

interval = setInterval(counting, 1000);

function counting(){
    para++;
    paraElement.innerHTML=para;
    if(para>9){
        clearInterval(interval);
        paraElement.innerHTML= "Welcome User🎉";
    }
}



// To Do App


    
    var inputElement = document.getElementById('input');
    var olDiv = document.getElementById('list');
    var editbtnElement;

function save(){
    if(inputElement.value === ""){
        alert("Please Enter To Do list");
    }
    else{
       
    var listElement= document.createElement('li');
    var listText = document.createTextNode(inputElement.value);
    listElement.appendChild(listText);

    var deletebtnElement = document.createElement('button');
    var deletebtnText = document.createTextNode('Delete');
    deletebtnElement.setAttribute('class','dltBtn');
    deletebtnElement.setAttribute('onclick','deleteItem(this)');
    deletebtnElement.appendChild(deletebtnText);
    listElement.appendChild(deletebtnElement)

    editbtnElement = document.createElement('button');
    var editbtnText = document.createTextNode('Edit');
    editbtnElement.setAttribute('class','editBtn');
    editbtnElement.setAttribute('onclick','edit(this)');
    editbtnElement.appendChild(editbtnText);
    listElement.appendChild(editbtnElement);


    olDiv.prepend(listElement);
    inputElement.value = ""
    }


}


function clearAll(){
    olDiv.innerHTML = "";
}

function deleteItem(a){
    a.parentElement.remove();
}

var inputField = document.createElement('input');
var okElement = document.createElement('button');
var allEditBtns = document.getElementsByClassName('editBtn');

function edit(b){
    b.parentElement.firstChild.nodeValue = "";
    b.parentElement.appendChild(inputField);
    var okText = document.createTextNode('Ok');
    okElement.setAttribute('onclick','okk(this)');
    okElement.setAttribute('class','okBtn')
    okElement.appendChild(okText);
    b.parentElement.appendChild(okElement); 
   
    for (var i = 0; i < allEditBtns.length; i++) {
        allEditBtns[i].disabled = true;
    }
}

function okk(c){
    if(inputField.value === ""){
        alert("Please Enter To Do list");
    }
    else{
    c.parentElement.firstChild.nodeValue = inputField.value;
    inputField.remove();
    okElement.remove();
    
    for (var i = 0; i < allEditBtns.length; i++) {
        allEditBtns[i].disabled = false;
    }
    }
    
}
