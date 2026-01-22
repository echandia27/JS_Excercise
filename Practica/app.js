document.addEventListener("DOMContentLoaded", () => {


    const role = localStorage.getItem("role");
    const dashboardTitle = document.querySelector("h1");
    const adminPanel = document.getElementById("adminPanel");

    if (role === "admin") {
        dashboardTitle.textContent = "Dashboard - ADMIN";
        if (adminPanel) adminPanel.style.display = "block";
    } else {
        dashboardTitle.textContent = "Dashboard - USER";
    }

    function sanitize(input) {
        return input.replace(/[<>]/g, "");
    }

    const input = document.getElementById("commentInput");
    const sendBtn = document.getElementById("sendBtn");
    const commentsDiv = document.getElementById("comments");

    sendBtn.addEventListener("click", () => {
        const userText = input.value.trim();

        if (userText === "") {
            alert("No puedes enviar comentarios vacios.")
            return;
        }

        if (userText.length > 100) {
            alert("maximo 100 caracteres");
            return;
        }
        const safeText = sanitize(userText);

        const p = document.createElement("p");
        p.textContent = safeText;

        commentsDiv.appendChild(p);
        input.value ="";
    });

});