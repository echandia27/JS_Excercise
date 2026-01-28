// 1. Definimos la URL de la API
const API_URL = "http://localhost:3000/users";

// 2. Seleccionamos el contenedor donde mostraremos los datos
const app = document.getElementById("app");

// 3. Función para obtener los usuarios
async function getUsers() {
    const response = await fetch(API_URL); // hace la petición GET
    const users = await response.json(); // convierte la respuesta a JSON
    renderUsers(users); // llama a la función que los dibuja
}

// 4. Función para renderizar usuarios en pantalla
function renderUsers(users) {
    app.innerHTML = "";
    users.forEach(user => {
        const userCard = document.createElement("div");
        userCard.className = "p-4 mb-2 bg-gray-50 border rounded";
        userCard.innerHTML = `
            <p class="font-bold">${user.name}</p>
            <p class="text-sm text-gray-600">${user.email}</p>
        `;
    });
}

// 5. Llamamos a la función al cargar
getUsers();