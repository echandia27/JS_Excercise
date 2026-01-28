// 1. Definimos la URL de la API
const API_URL = "http://localhost:3000/users";

// 2. Seleccionamos el contenedor donde mostraremos los datos
const app = document.getElementById("app");

// 3. Estado: modo edición 
let editingUserId = null;

// 4. Función para obtener los usuarios
async function getUsers() {
    const response = await fetch(API_URL); // hace la petición GET
    const users = await response.json(); // convierte la respuesta a JSON
    renderUsers(users); // llama a la función que los dibuja
}

// 5. Función para renderizar usuarios en pantalla
function renderUsers(users) {
    app.innerHTML = "";
    users.forEach(user => {
        const userCard = document.createElement("div");
        userCard.className = "p-4 mb-2 bg-gray-50 border rounded";
        userCard.innerHTML = `
            <p class="font-bold">${user.name}</p>
            <p class="text-sm text-gray-600">${user.email}</p>
        `;
        // Botón Editar
        const editBtn = document.createElement("button");
        editBtn.textContent = "Editar";
        editBtn.className = "bg-yellow-500 text-white px-2 py-1 rounded mt-2 hover:bg-yellow-600";
        editBtn.addEventListener("click", () => editUser(user)); 
        
        // Boton Eliminar
        const deleteBtn = document. createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.className = "bg-red-500 text-white px-2 py-1 rounded mt-2 hover:bg-red-600";
        deleteBtn.addEventListener("click", () => deleteUser(user.id));

        userCard.appendChild(editBtn);
        userCard.appendChild(deleteBtn);
        app.appendChild(userCard);
    });
}

// 6. Seleccionamos el formulario
const userForm = document.getElementById("userForm");

// 7. Escuchamos el evento submit
userForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 8. Obtenemos los valores de los inputs
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (editingUserId) {
         // Modo edición → PUT 
        await fetch(`${API_URL}/${editingUserId}`, {
            method: "PUT", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email })
        }); 
        editingUserId = null; // volvemos a modo crear 
    } else { 
        // Modo crear → POST
        await fetch(API_URL, { 
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email })
        });
    } 
    getUsers(); 
    userForm.reset(); 
});

async function editUser(user) {
    //Rellenamos el usuario con los datos actuales
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    editingUserId = user.id; // activamos modo edición
    }

async function deleteUser(id) {
    // Confirmamos antes de eliminar
    const confirmDelete = confirm("seguro que quieres eliminar este usuario?");
    if ( !confirmDelete) return;

    //peticion delete
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    getUsers();
    
}
 

// 9. Llamamos a la función al cargar
getUsers();