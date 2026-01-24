document.addEventListener("DOMContentLoaded", () => {


    const role = localStorage.getItem("role");
    const dashboardTitle = document.querySelector("h1");
    const adminPanel = document.getElementById("adminPanel");
    const adminComments = document.getElementById("adminComments");
    const userReplies = document.getElementById("userReplies");

    if (role === "admin") {
        dashboardTitle.textContent = "Dashboard - ADMIN";
        if (adminPanel) adminPanel.style.display = "block";
        if (adminComments) adminComments.style.display = "block";
    } else {
        dashboardTitle.textContent = "Dashboard - USER";
        if (userReplies) userReplies.style.display = "block";
    }

    function sanitize(input) {
        return input.replace(/[<>]/g, "");
    }

    const input = document.getElementById("commentInput");
    const sendBtn = document.getElementById("sendBtn");

    if (sendBtn) {
        sendBtn.addEventListener("click", () => {
            const userText = input.value.trim();

            if (userText === "") {
                alert("No puedes enviar comentarios vacios.")
                return;
            }

            const comments = JSON.parse(localStorage.getItem("comments")) || [];

            comments.push({
                id: Date.now(),
                text: sanitize(userText),
                reply: "",
                visibleToUser: false
            });

            localStorage.setItem("comments", JSON.stringify(comments));
            input.value = "";
            alert("Comentario enviado al administrador");
        });
    }

 


    function renderAdminComments() {
        const comments = JSON.parse(localStorage.getItem("comments")) || [];
        adminComments.innerHTML = "<h3>Comentarios de usuarios</h3>";

        comments.forEach(c => {
            const card = document.createElement("div");
            card.style.border = "1px solid #ccc";
            card.style.padding = "10px";
            card.style.marginBottom = "10px";

            card.innerHTML = `
                <p><strong>Comentario:</strong> ${c.text}</p>
                <textarea placeholder="Responer...">${c.reply}</textarea>
                <br>
                <button class="replyBtn">Responder</button>
                <button class="deleteBtn">Eliminar</button>
            `;

            const replyBtn = card.querySelector(".replyBtn");
            const deleteBtn = card.querySelector(".deleteBtn");
            const textarea = card.querySelector("textarea");

            replyBtn.onclick = () => {
                c.reply = textarea.value;
                c.visibleToUser = true;
                saveComments(comments);
                alert("Respuesta enviada");
            };

            deleteBtn.onclick = () => {
                saveComments(comments.filter(x => x.id !== c.id));
                renderAdminComments();
            };

            adminComments.appendChild(card);
        });
    }

    function renderUserReplies() {
        const comments = JSON.parse(localStorage.getItem("comments")) || [];
        userReplies.innerHTML = ""
    }

    function saveComments(data) {
        localStorage.setItem("comments", JSON.stringify(data));
    }

    // Ejecucion
    if (role === "admin") {
    adminComments.style.display = "block";
    } else {
        userReplies.style.display = "block";
    }

    //logout
   const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("isLogged");
            localStorage.removeItem("role");
            window.location.href = "index.html";
        });
    }

});