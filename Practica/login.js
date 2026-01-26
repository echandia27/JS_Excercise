// 1. CAPTURAR ELEMENTOS DEL HTML
const loginBtn = document.getElementById("loginBtn");  // Botón "Entrar"
const userInput = document.getElementById("username"); // Campo de texto

// 2. ESCUCHAR CUANDO SE HACE CLIC EN "ENTRAR"
loginBtn.addEventListener("click", () => {
    // 3. OBTENER EL NOMBRE ESCRITO POR EL USUARIO
    const username = userInput.value.trim();
    
    // 4. VALIDACIÓN: ¿Escribió algo?
    if (username === "") {
        alert("Debes escribir un usuario");
        return; // Se detiene aquí
    }
    
    // 5. GUARDAR EN LA "MEMORIA DEL NAVEGADOR" (localStorage)
    localStorage.setItem("isLogged", "true");   // Marca como "logueado"
    localStorage.setItem("username", username); // Guarda el nombre
    
    // 6. ASIGNAR ROL: ¿Es admin o usuario normal?
    if (username.toLowerCase() === "admin") {
        localStorage.setItem("role", "admin");  // 👑
    } else {
        localStorage.setItem("role", "user");   // 👤
    }
    
    // 7. REDIRIGIR A LA PÁGINA PRINCIPAL
    window.location.href = "dashboard.html";
});