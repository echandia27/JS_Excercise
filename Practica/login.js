const loginBtn = document.getElementById("loginBtn");
const userInput = document.getElementById("username");


loginBtn.addEventListener("click", () => {
    const username = userInput.value.trim().toLowerCase();

    if (username === "") {
        alert("Debes escribir un usuario");
        return;
    }

    localStorage.setItem("isLogged", "true");
    
    window.location.href = "dashboard.html";
});