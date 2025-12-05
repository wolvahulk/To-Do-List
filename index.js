// To-Do App Logic:

const input = document.getElementById("inputArea");
const button = document.getElementById("submitBtn");
const list = document.getElementById("list");

button.addEventListener("click", () => {

    if(input.value.trim() !== ""){
    
    const listItem = document.createElement("li");

    const liInput = document.createElement("input");
    liInput.setAttribute("type", "checkbox");
    liInput.addEventListener("change", () => {
        
        if(liInput.checked){
            listItem.classList.add("done");
        }
        else{
            listItem.classList.remove("done");
        }
        
    });

    const span = document.createElement("span");
    span.textContent = input.value;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Del";

    listItem.appendChild(liInput);
    listItem.appendChild(span);
    listItem.appendChild(delBtn);

    list.appendChild(listItem);

    delBtn.addEventListener("click", () => {
        list.removeChild(listItem);
    });

    input.value = "";
    input.focus();
    }

});