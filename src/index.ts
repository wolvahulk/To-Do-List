// To-Do App Logic:
type taskObj = {
    task: string;
    done: boolean;
}

const input = <HTMLInputElement>document.getElementById("inputArea");
const button = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");
const list = <HTMLUListElement>document.getElementById("list");
let tasks: taskObj[] = [];

function appInit() {

    if(!input || !button || !clearBtn || !list){
        console.error("no elements found!")
        return
    }

button.addEventListener("click", () => {

    if(input.value.trim() !== ""){
    
    manageTasks();

    input.value = "";
    input.focus();
    saveTasks();
    console.log(localStorage);
    }

});

input.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
        button.click();
    }
});

clearBtn.addEventListener("click", () => {
    tasks = [];
    
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }

    saveTasks();
    console.log(localStorage);
});

function manageTasks(data: taskObj | null = null) {
    const listItem = document.createElement("li");

    const liInput = document.createElement("input");
    liInput.setAttribute("type", "checkbox");

    const taskObj = data || { task: input.value, done: false};

    if(!data){
        tasks.push(taskObj);
    }
    
    if(taskObj.done){
        liInput.checked = true;
        listItem.classList.add("done");
    }

    liInput.addEventListener("change", () => {
        
        if(liInput.checked){
            listItem.classList.add("done");
            taskObj.done = true;
        }
        else{
            listItem.classList.remove("done");
            taskObj.done = false;
        }
        saveTasks();
        console.log(localStorage);
        
    });

    const span = document.createElement("span");
    span.textContent = taskObj.task;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Del";

    listItem.appendChild(liInput);
    listItem.appendChild(span);
    listItem.appendChild(delBtn);

    list.appendChild(listItem);

    delBtn.addEventListener("click", () => {
        list.removeChild(listItem);
        const index = tasks.indexOf(taskObj);
        if(index > -1) {
            tasks.splice(index, 1);
        }
        saveTasks();
        console.log(localStorage);
    });
}

function saveTasks() {
    localStorage.setItem("savedTasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem("savedTasks");

    if(savedTasks) {
        tasks = JSON.parse(savedTasks);

        tasks.forEach((data) => {
            manageTasks(data);
        });
    }
}

loadTasks();
}

appInit();