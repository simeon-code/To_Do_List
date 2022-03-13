const dateText = document.getElementById('date-element');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('tasks');
const addButton = document.getElementById('add-button');
const refreshButton = document.querySelector('.refresh');
const UNCHECKED_ICON = "far";
const CHECKED_ICON = "fas";
const LINE_THROUGH = "line-through";

//Date
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



//Adding a task
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


//Adding using the input panel

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


//Complete task
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

//Remove task
function removeTask(element){
    //element is the trash bin
    element.parentNode.parentNode.removeChild(element.parentNode);

    for(let i=0; i < arr.length; i++){
        if(arr[i].id == element.parentNode.querySelector(".check").id){
            arr.splice(i,1);
            break;
        }
    }
}

//Completing!
taskList.addEventListener('click', function(el){
    if(el.target.classList.contains("check")){
        completeTask(el.target);
    }else if(el.target.classList.contains("delete")){
        removeTask(el.target);
    }
    localStorage.setItem("TODO", JSON.stringify(arr));
});

refreshButton.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
});

//Adding task using the input panel     JQUERY
// $('document').keydown(function(e){
//     if(e.key==="Enter"){
//         const inputText = taskInput.value;
//         if(inputText){
//             addTask(inputText);
//         }
//         taskInput.value = "";
//     }
// });
