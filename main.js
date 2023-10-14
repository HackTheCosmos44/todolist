//SELECTEURS

const toDoInput = document.querySelector(".toDoInput");
const toDoButton = document.querySelector(".toDoButton");
const toDoList = document.querySelector(".toDoList");
const filterOption = document.querySelector(".filterToDo")

//ECOUTEURS DEVENEMENTS
document.addEventListener("DOMContentLoaded", getToDos());
toDoButton.addEventListener("click", addToDo);
toDoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterToDo);


//FONCTIONS


//ajout d'une tache
function addToDo(event) {
    event.preventDefault();
    if (toDoInput.value != ""){
        //création d'une toDo div
        const toDoDiv = document.createElement("div");
    
        toDoDiv.classList.add("toDo");
        // création du li
        const newToDo = document.createElement("li");
        newToDo.innerText =toDoInput.value;
        newToDo.classList.add("toDoItem")
        //ajout du li à la div
        toDoDiv.appendChild(newToDo);
        
        // ajouter la tache au local storage
        saveLocalTodos(toDoInput.value);
        
        //création du bouton checked
        const checkButton = document.createElement("button");
        checkButton.innerHTML ='<i class="fa-solid fa-check"></i>';
        checkButton.classList.add("checkButton");
        toDoDiv.appendChild(checkButton)
        
        //création du boutton delete
        const deleteButton = document.createElement("button")
        deleteButton.innerHTML ='<i class="fa-solid fa-trash"></i>';
        deleteButton.classList.add("deleteButton");
        toDoDiv.appendChild(deleteButton)
        
        //ajout d'un bloc todo
        toDoList.appendChild(toDoDiv)
        
        //on rafraichi l'input
        toDoInput.value ="";
    }
}

//gestion des boutons check et delete
function deleteCheck (e) {
    const item = e.target
    
    //delete todo
    if (item.classList[0] === "deleteButton"){
        const toDo = item.parentElement
        toDo.classList.add("fall");
        removeLocalToDo(toDo);
        toDo.addEventListener("transitionend", ()=> {
            toDo.remove();
        })
    }
    
    //check button 
    if (item.classList[0] === "checkButton"){
        const toDo = item.parentElement
        toDo.classList.toggle("checked")
    }
    
    
}

// gestion des filtres
function filterToDo (e) {
    const toDos = toDoList.childNodes;
    toDos.forEach(function(toDo) {
        switch (e.target.value) {
            case 'all':
                toDo.style.display="flex";
                break;
            case "checked":
                if(toDo.classList.contains("checked")){
                    toDo.style.display ="flex";   
                } else {
                    toDo.style.display =" none"
                }
                break;
            case "unchecked":
                if(!toDo.classList.contains("checked")){
                    toDo.style.display ="flex";   
                } else {
                    toDo.style.display =" none"
                }
                break;
        }
    })
}

//sauvegarde des données
function saveLocalTodos (toDo) {
    // checker si il y a des items existants
    let toDos;
    if(localStorage.getItem("toDos") === null) {
        toDos = [];
    } else {
        toDos = JSON.parse(localStorage.getItem("toDos"))
    }
    
    toDos.push(toDo);
    localStorage.setItem("toDos", JSON.stringify(toDos))
}

// va chercher les todos dans le local storage
function getToDos () {
     // checker si il y a des items existants
    let toDos;
    if(localStorage.getItem("toDos") === null) {
        toDos = [];
    } else {
        toDos = JSON.parse(localStorage.getItem("toDos"))
    }
    toDos.forEach(function(toDo){
        //création d'une toDo div
        const toDoDiv = document.createElement("div");
    
        toDoDiv.classList.add("toDo");
        // création du li
        const newToDo = document.createElement("li");
        newToDo.innerText =toDo;
        newToDo.classList.add("toDoItem")
        //ajout du li à la div
        toDoDiv.appendChild(newToDo);
        
        //création du bouton checked
        const checkButton = document.createElement("button");
        checkButton.innerHTML ='<i class="fa-solid fa-check"></i>';
        checkButton.classList.add("checkButton");
        toDoDiv.appendChild(checkButton)
        
        //création du boutton delete
        const deleteButton = document.createElement("button")
        deleteButton.innerHTML ='<i class="fa-solid fa-trash"></i>';
        deleteButton.classList.add("deleteButton");
        toDoDiv.appendChild(deleteButton)
        
        //ajout d'un bloc todo
        toDoList.appendChild(toDoDiv)
    })
}

//suppression des todos
function removeLocalToDo(toDo) {
      // checker si il y a des items existants
    let toDos;
    if(localStorage.getItem("toDos") === null) {
        toDos = [];
    } else {
        toDos = JSON.parse(localStorage.getItem("toDos"))
    }
    const toDoIndex =toDo.children[0].innerText
    toDos.splice(toDos.indexOf(toDoIndex), 1)
    localStorage.setItem("toDos", JSON.stringify(toDos))
}