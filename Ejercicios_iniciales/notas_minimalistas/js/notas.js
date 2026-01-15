let notes = [];
let currentCategory = "all";
let searchText = "";

// elementos

const form = document.getElementById("note-form");
const notesList = document.getElementById("notes-list");
const categoryFilter = document.getElementById("category-filter");
const searchInput = document.getElementById("search");

//eventos

form.addEventListener("submit", createNote);
categoryFilter.addEventListener("change", filteredNotes);

//crear nota

function createNote (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const category = document.getElementById("category").value;

    if (!title || !content || !category) {
        alert("Completa los campos");
        return;
    }

    const note = {
        id: Date.now(),
        title,
        content,
        category

    };

    notes.push(note);
    saveNotes();
    renderNotes();
    form.reset();
}

//renderizar

function renderNotes() {
    notesList.innerHTML= "";

    let filteredNotes = notes;

    if (currentCategory !== "all") {
        filteredNotes = filteredNotes.filter(
            note => note.category ===currentCategory
        );
    }

    if (searchText !== "") {
        filteredNotes = filteredNotes.filter(note =>
            note.title.toLowerCase().includes(searchText) ||
            note.content.toLowerCase().includes(searchText)
        );
    }

    filteredNotes.forEach(note => {
        const div = document.createElement("div");
        div.classList.add("note");

        const title = document.createElement("div");
        title.classList.add("note-title");
        title.textContent = note.title;

        const category = document.createElement("div");
        category.classList.add("note-category");
        category.textContent = note.category;

        const content = document.createElement("div");
        content.classList.add("note-content");
        content.textContent = note.content;

        const btn = document.createElement("button");
        btn.textContent = "Eliminar";
        btn.classList.add("btn", "btn-danger", "btn-sm", "mt-2");

        btn.addEventListener("click", () => {
            deleteNote(note.id);
        });

        div.appendChild(title);
        div.appendChild(category);
        div.appendChild(content);
        div.appendChild(btn);

        notesList.appendChild(div);
    });
}

//filtar

function filteredNotes(e) {
    currentCategory = e.target.value;
    renderNotes();
}

//local storage

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
    const stored = localStorage.getItem("notes");
    if (stored) {
        notes = JSON.parse(stored);
        renderNotes();
    }
}

loadNotes();

function deleteNote(id) {
    const confirmDelete = confirm("Desea Eliminar esta nota?");
    if (!confirmDelete)
        return;

    notes= notes.filter(note => note.id !== id);
    saveNotes();
    renderNotes();
}

//buscar

searchInput.addEventListener("input", (e) => {
    searchText =e.target.value.toLowerCase();
    renderNotes();
});
