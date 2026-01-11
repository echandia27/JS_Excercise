let tasks = [];
let currentStatusFilter = "all";
let currentPriorityFilter = "all";

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

    let filteredTasks =tasks;

    if (currentStatusFilter !== "all") {
        filteredTasks = filteredTasks.filter(
            task => task.status === currentStatusFilter
        );
    }

    if (currentPriorityFilter !== "all") {
        filteredTasks = filteredTasks.filter(
            task => task.priority === currentPriorityFilter
        );
    }

    filteredTasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task", task.priority);

        if (task.status === "completada") {
            taskDiv.classList.add("opacity-50");
        }

        taskDiv.innerHTML = `
        <h5>${task.title}</h5>
        <p>${task.description}</p>
        <select class="form-select mb-2">
            <option value="pendiente" ${task.status === "pendiente" ? "selected" : ""}>Pendiente</option>
            <option value="proceso" ${task.status === "proceso" ? "selected" : ""}>En proceso</option>
            <option value="completada" ${task.status === "completada" ? "selected" : ""}>Completada</option>
            </select>

            <button class="btn btn-danger btn-sm">Eliminar</button>
        `;

        // Cambio de estado
        const statusSelect = taskDiv.querySelector("select");

        statusSelect.addEventListener("change", (e) => {
            task.status=e.target.value;
            renderTasks();
        });

        // Eliminar tarea
        const deleteBtn = taskDiv.querySelector("button");
        deleteBtn.addEventListener("click", () => {
            deleteTask(task.id);
        });

        taskList.appendChild(taskDiv);
    });
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
    showMessage("Tarea eliminada", "info");
}

const filterButtons = document.querySelectorAll("[data-filter]");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentStatusFilter = button.dataset.filter;
        renderTasks();
    });
});

const priorityFilter = document.getElementById("priority-filter");

priorityFilter.addEventListener("change", (e) => {
    currentPriorityFilter = e.target.value;
    renderTasks();
});

