console.log("PROTECT RUNNING");

const isLogged = localStorage.getItem("isLogged");
const role = localStorage.getItem("role");

if (isLogged !== "true") {
    window.location.href = "index.html";
}

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLogged");
    window.location.href = "index.html"
});