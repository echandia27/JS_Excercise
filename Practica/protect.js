console.log("PROTECT.JS RUNNING - Protegiendo ruta...");

// 1. REVISAR LA "MEMORIA": ¿Está logueado?
const isLogged = localStorage.getItem("isLogged");
const role = localStorage.getItem("role");

// 2. SI NO ESTÁ LOGUEADO → ¡FUERA!
if (isLogged !== "true") {
    console.log("❌ No autenticado, redirigiendo...");
    alert("Debes iniciar sesión primero.");
    window.location.href = "index.html"; // Devuelve al login
}

console.log(`✅ Usuario autenticado como: ${role}`);

// 3. CONFIGURAR BOTÓN DE "CERRAR SESIÓN"
document.addEventListener("DOMContentLoaded", function() {
    const logoutBtn = document.getElementById("logoutBtn");
    
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault(); // Evita comportamiento por defecto
            
            if (confirm("¿Estás seguro de cerrar sesión?")) {
                // 4. LIMPIAR LA "MEMORIA"
                localStorage.removeItem("isLogged");
                localStorage.removeItem("role");
                localStorage.removeItem("username");
                window.location.href = "index.html"; // Volver al login
            }
        });
    }
});