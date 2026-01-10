let tasks = [];

const taskForm = document.getElementById("task-form");
taskForm.addEventListener("submit", handleSubmit);

// creamos handleSubmit

function handleSubmit(e) {
    e.preventDefault(); //evita que la pagina recargue

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const priorityInput = document.querySelector(`input[name = "priority"]:checked`);

    //validaciones
    if (!title || !description || !priorityInput) {
        showMessage("Todos los campos son obligatorios", "danger");
        return;
    }   

    const task = {
        id: Date.now(),
        title,
        description,
        priority: priorityInput.value,
        status: "pendiente"
    };

    tasks.push(task);
    renderTasks();

    showMessage("Tarea creada correctamente", "success");

    taskForm.reset();

    console.log(tasks)

}

function showMessage(text, type) {
    const messageDiv =document.getElementById("message");

    messageDiv.innerHTML =`
        <div class="alert alert-${type}">
            ${text}
        </div>
        `;

        setTimeout(() => {
            messageDiv.innerHTML = "";
        }, 2000);
}

//conectamos js con html en la parte de las tarjetas
const taskList = document.getElementById("task-list");

//esta funcion limpiara la lista y crea las tareas en el DOM
function renderTasks () {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task", task.priority);

        taskDiv.innerHTML = `
        <h5>${task.title}</h5>
        <p>${task.description}</p>
        <span class="badge bg-secondary">${task.status}</span>
        `;

        taskList.appendChild(taskDiv);
    });
}

