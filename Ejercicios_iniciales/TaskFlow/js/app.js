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
    saveTasks();
    renderTasks();
    updateCounters();

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
const dropZones = document.querySelectorAll(".drop-zone");

//esta funcion limpiara la lista y crea las tareas en el DOM
function renderTasks () {
    dropZones.forEach(zone => zone.innerHTML = "");

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
        taskDiv.classList.add("task", task.status, task.priority);

        taskDiv.setAttribute("draggable", "true");

        taskDiv.addEventListener("dragstart", () => {
            taskDiv.classList.add("dragging");
            taskDiv.dataset.id=task.id;
        });
        taskDiv.addEventListener("dragend", () => {
            taskDiv.classList.remove("dragging");
        });


        if (task.status === "completada") {
            taskDiv.classList.add("opacity-50");
        }

        taskDiv.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-2">
        <h5 class=mb-0>${task.title}</h5>
        ${getPriorityBadge(task.priority)}
        </div>

        <p>${task.description}</p>

        <div class="mb-2">
            ${getStatusBadge(task.status)}
        </div>

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
            saveTasks();
            renderTasks();
            updateCounters();
        });

        // Eliminar tarea
        const deleteBtn = taskDiv.querySelector("button");
        deleteBtn.addEventListener("click", () => {
            deleteTask(task.id);
        });
        const zone = document.querySelector(
            `.drop-zone[data-status="${task.status}"]`
        );
        if (zone) {
            zone.appendChild(taskDiv);
        }
    });
}

function getPriorityBadge(priority) {
    switch (priority) {
        case "alta":
            return `<span class="badge bg-danger">Alta</span>`;
        case "media":
            return `<span class="badge bg-warning text-dark">Media</span>`;
        case "baja":
            return `<span class= "badge bg-success">Baja</span>`;
        default:
            return "";
    }
}

function getStatusBadge(status) {
    switch (status) {
        case "pendiente":
            return `<span class="badge bg-secondary">Pendiente</span>`;
        case "proceso":
            return `<span class="badge bg-info text-dark">En proceso</span>`;
        case "completada":
            return `<span class="badge bg-success">Completada</span>`;
        default:
            return "";
    }
}

function deleteTask(id) {
    const confirmDelete = confirm("Estás seguro de eliminar esta tarea?");

    if (!confirmDelete) {
        return;
    }

    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
    updateCounters();
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

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");

    if(storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
        updateCounters();
    }
}

loadTasks();

function updateCounters() {
    document.getElementById("count-all").textContent=tasks.length;

document.getElementById("count-pendiente").textContent=
    tasks.filter(task => task.status === "pendiente").length;

document.getElementById("count-proceso").textContent=
    tasks.filter(task => task.status === "proceso").length;

document.getElementById("count-completada").textContent=
    tasks.filter(task => task.status === "completada").length;
}

dropZones.forEach(zone => {
    //permitir que se pueda soltar
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();
        zone.classList.add("drag-over");
    });

    //quitar efecto visual al salir
    zone.addEventListener("dragleave", () => {
        zone.classList.remove("drag-over");
    });

    //cuando se suelta la tarea
    zone.addEventListener("drop", (e) => {
        e.preventDefault();
        zone.classList.remove("drag-over");

        //obtener tarea que se arrastro
        const draggedTask = document.querySelector(".dragging");
        if (!draggedTask) return;

        const taskId = draggedTask.dataset.id;
        const newStatus = zone.dataset.status;

        //buscar tarea en el array
        const task= tasks.find(t => t.id == taskId);

        if (task) {
            task.status = newStatus;
            saveTasks();
            renderTasks();
            updateCounters();
        }
    });
});

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

//cargar tema guardado
const savedTheme =localStorage.getItem("theme");

if (savedTheme === "dark"){
    body.setAttribute("data-theme", "dark");
themeToggle.textContent="☀️ Modo claro";
}

//cambiar tema
themeToggle.addEventListener("click", () => {
    const isDark = body.getAttribute("data-theme") === "dark";

    if (isDark) {
        body.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙 Modo oscuro"
    } else {
        body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️ Modo claro"
    }
});