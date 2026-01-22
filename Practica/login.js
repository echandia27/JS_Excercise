const loginBtn = document.getElementById("loginBtn");
const userInput = document.getElementById("username");


loginBtn.addEventListener("click", () => {
    const username = userInput.value.trim().toLowerCase();

    if (username === "") {
        alert("Debes escribir un usuario");
        return;
    }

    localStorage.setItem("isLogged", "true");

    if (username === "admin") {
        localStorage.setItem("role", "admin");
    } else {
        localStorage.setItem("role", "user");
    }
    
    window.location.href = "dashboard.html";
});