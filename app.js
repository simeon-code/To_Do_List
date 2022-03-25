const dateText = document.getElementById('date-element');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('tasks');
const addButton = document.getElementById('add-button');
const refreshButton = document.querySelector('.refresh');
const symbolCounter = document.querySelector('.symbol-counter');

//ClassList variables
const UNCHECKED_ICON = "far";
const CHECKED_ICON = "fas";
const LINE_THROUGH = "line-through";

//Today's date element
const options = {month: "long", day: "numeric", year: "numeric"};
const today = new Date();
dateText.innerHTML = today.toLocaleDateString("bg-BG", options);

//array to store all the elements
let arr = [];
let id = 0;

//local storage backup
let data = localStorage.getItem("TODO");
if(data){
    arr = JSON.parse(data);
    loadList(arr);
}else{
    console.log("ebi se");
    arr = [];
}

function loadList(array){
    array.forEach(element => {
        addTask(element.taskText, element.id, element.done);
    });
}



//Funtion to add a task element in the list
function addTask(textInput, id, done){

    const DONE = done ? CHECKED_ICON : UNCHECKED_ICON;
    const LINE = done ? LINE_THROUGH : "";

    const text = `
        <li class="task-element">
        <i class="icon check ${DONE} fa-check-circle" job="complete" id="${id}"></i>
        <p class="${LINE} task-text">${textInput}</p>
        <i class="icon delete fas fa-trash-alt"></i>                   
        </li>
    `;

    const position = "beforeend";
    taskList.insertAdjacentHTML(position, text);
}



//Function to add a task using the input panel
function newTask(){
    const inputText = taskInput.value;
    if(inputText){
        addTask(inputText, id, false);
        arr.push({
            taskText : inputText,
            id : id,
            done: false
        });
        id++;
    }
    taskInput.value = "";
    
    localStorage.setItem("TODO", JSON.stringify(arr));
}

document.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        newTask();
    }
});

addButton.addEventListener('click', newTask);


//Function to check/uncheck a task element
function completeTask(task){
    task.classList.toggle(CHECKED_ICON);
    task.classList.toggle(UNCHECKED_ICON);
    task.parentNode.querySelector(".task-text").classList.toggle(LINE_THROUGH);
    for(let i=0; i < arr.length; i++){
        if(arr[i].id == task.id){
            arr[i].done = arr[i].done ? false : true;
            break;
        }
    }
}

//Function to remove a task element
function removeTask(element){
    //Element being the trash bin icon
    element.parentNode.parentNode.removeChild(element.parentNode);

    for(let i=0; i < arr.length; i++){
        if(arr[i].id == element.parentNode.querySelector(".check").id){
            arr.splice(i,1);
            break;
        }
    }
}

//Changing task element status
taskList.addEventListener('click', function(el){
    if(el.target.classList.contains("check")){
        completeTask(el.target);
    }else if(el.target.classList.contains("delete")){
        removeTask(el.target);
    }
    localStorage.setItem("TODO", JSON.stringify(arr));
});

//Deleting all the saved elements
refreshButton.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
});

//Symbol counter
taskInput.addEventListener('keyup', function(){
    let inputValue = taskInput.value;
    let inputLength = inputValue.length;
    symbolCounter.innerHTML = `${inputLength}/20`;
    if(inputLength==20){
        symbolCounter.classList.add('stop-counter');
    }else if(inputLength<25){
        symbolCounter.classList.remove('stop-counter');
    }
    
});

