var firebaseConfig = {
    apiKey: "AIzaSyCb-b42nrb4sFOOk25vIaEeD4Nmch420F0",
    authDomain: "todo-database-bff47.firebaseapp.com",
    databaseURL: "https://todo-database-bff47-default-rtdb.firebaseio.com",
    projectId: "todo-database-bff47",
    storageBucket: "todo-database-bff47.firebasestorage.app",
    messagingSenderId: "379056051385",
    appId: "1:379056051385:web:a4286071de59a87c6cf768"
  };

  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);

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




firebase.database().ref("todos").on("child_added", function(data){
        var listElement= document.createElement('li');
        var listText = document.createTextNode(data.val().input_value);
        listElement.appendChild(listText);

        var deletebtnElement = document.createElement('button');
        var deletebtnText = document.createTextNode('Delete');
        deletebtnElement.setAttribute('class','dltBtn');
        deletebtnElement.setAttribute('onclick','deleteItem(this)');
        deletebtnElement.setAttribute("id", data.val().id);
        deletebtnElement.appendChild(deletebtnText);
        listElement.appendChild(deletebtnElement)

        editbtnElement = document.createElement('button');
        var editbtnText = document.createTextNode('Edit');
        editbtnElement.setAttribute('class','editBtn');
        editbtnElement.setAttribute('onclick','edit(this)');
        editbtnElement.setAttribute("id", data.val().id);
        editbtnElement.appendChild(editbtnText);
        listElement.appendChild(editbtnElement);

        olDiv.prepend(listElement);
        inputElement.value = ""
    console.log(data.val().id);
})

function save(){
    if(inputElement.value === ""){
        alert("Please Enter To Do list");
    }
    else{
        var id = firebase.database().ref("todos").push().key;
        var obj = {
            input_value:inputElement.value,
            id:id,
        }
        
        firebase.database().ref(`todos/${id}`).set(obj);
        console.log(obj.id);


    }
}

function clearAll(){
    olDiv.innerHTML = "";
    firebase.database().ref(`todos`).remove();

}

function deleteItem(a){
    a.parentElement.remove();
    firebase.database().ref(`todos/${a.id}`).remove();
    console.log(a.id);
}

function edit(b){
    var inputField = document.createElement('input');
    inputField.setAttribute('class','input2');

    var okElement = document.createElement('button');
    var okText = document.createTextNode('Ok');
    okElement.setAttribute('onclick','okk(this)');
    okElement.setAttribute('class','okBtn');
    okElement.appendChild(okText);

    b.parentElement.firstChild.nodeValue = "";
    b.parentElement.appendChild(inputField);
    b.parentElement.appendChild(okElement); 

    var allEditBtns = document.getElementsByClassName('editBtn');
    for (var i = 0; i < allEditBtns.length; i++) {
        allEditBtns[i].disabled = true;
    }
}

function okk(c){
    var input = c.previousSibling;
    if(input.value === ""){
        alert("Please Enter To Do list");
    }
    else{
        c.parentElement.firstChild.nodeValue = input.value;
        

        var obj = {
            input_value: input.value,
            id: c.id,
          };

          console.log(obj.id);
        
          firebase.database().ref(`todos/${c.parentElement.firstChild.id}`).set(obj);

          input.remove();
        c.remove();

        var allEditBtns = document.getElementsByClassName('editBtn');
        for (var i = 0; i < allEditBtns.length; i++) {
            allEditBtns[i].disabled = false;
        }
    }
}
