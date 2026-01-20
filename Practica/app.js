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