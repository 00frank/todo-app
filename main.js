const tareas = JSON.parse(localStorage.getItem("todos")) || []; //short-circuit eval
const formulario = document.querySelector("form");
const tarea = document.querySelector("input#tarea");
const contenedor = document.querySelector("div ul");
const trash = '<i class="fas fa-trash-alt"></i>';

window.onload = () => {
    render();
    formulario.onsubmit = (e) => {
        e.preventDefault();
        if (tarea.value != "") {
            var t = document.createElement("li");
            t.innerHTML =
                `<li class="t">
                    <span>${tarea.value}</span>
                    <div class="btns">
                        <span id="trash">${trash}</span>
                    </div>
                 </li>`
            tareas.push(t.innerHTML)
            actualizarStorage(tareas);
            vaciarForm();
            render();
        }
    }
}

const render = () => {
    printTareas();
    const btnTrash = document.querySelectorAll("#tareas ul li div span#trash");
    btnTrash.forEach((e, id) => {
        e.addEventListener("click", () => {
            let contenedor = e.parentNode.parentNode.parentNode;
            let tareaAct = e.parentNode.parentNode;
            contenedor.removeChild(tareaAct);
            tareas.splice(id, 1);
            actualizarStorage(tareas);
        })
    })
}

const actualizarStorage = (tareas) => { 
    let tareaString = JSON.stringify(tareas);
    localStorage.setItem("todos", tareaString);
}

const printTareas = () => {
    let tareaString = tareas.map(t => t).join("");
    contenedor.innerHTML = tareaString;
}


const vaciarForm = () => {
    tarea.value = "";
}